"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [newPassword, setNewPassword] = useState("")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")

      if (response.status === 401) {
        router.push("/admin")
        return
      }

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        setError("Erro ao carregar usuários")
      }
    } catch (error) {
      setError("Erro de conexão")
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId))
      } else {
        setError("Erro ao excluir usuário")
      }
    } catch (error) {
      setError("Erro de conexão")
    }
  }

  const changePassword = async () => {
    if (!newPassword) {
      alert("Digite uma nova senha")
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: newPassword })
      })

      if (response.ok) {
        alert("Senha alterada com sucesso!")
        setShowPasswordModal(false)
        setNewPassword("")
        setSelectedUser(null)
      } else {
        setError("Erro ao alterar senha")
      }
    } catch (error) {
      setError("Erro de conexão")
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin")
    } catch (error) {
      router.push("/admin")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Usuários Cadastrados ({users.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Links
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado em
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.profile ? (
                          <div>
                            <div className="text-sm text-gray-900">
                              @{user.profile.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.profile.displayName || "Sem nome de exibição"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            Sem profile
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {user.profile?.links?.length || 0} links
                        </span>
                        {user.profile?.links?.length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {user.profile.links.slice(0, 2).map((link, idx) => (
                              <div key={idx} className="truncate max-w-xs">
                                {link.title}
                              </div>
                            ))}
                            {user.profile.links.length > 2 && (
                              <div>+{user.profile.links.length - 2} mais</div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setShowPasswordModal(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Alterar Senha
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum usuário encontrado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para alterar senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Alterar senha de {selectedUser?.name}
              </h3>
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    setShowPasswordModal(false)
                    setNewPassword("")
                    setSelectedUser(null)
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={changePassword}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Alterar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}