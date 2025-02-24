'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export function LinksManager({ initialLinks = [], profileId }) {
  const router = useRouter()
  const [links, setLinks] = useState(initialLinks)
  const [isLoading, setIsLoading] = useState(false)
  const [newLink, setNewLink] = useState({ title: '', url: '', image: '' })
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [editingLink, setEditingLink] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem')
      }

      const data = await response.json()
      setNewLink(prev => ({ ...prev, image: data.url }))
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const handleSaveLink = async (e) => {
    e.preventDefault()
    
    if (editingLink) {
      // Atualizar link existente
      try {
        setIsLoading(true)
        const response = await fetch(`/api/links/${editingLink.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newLink.title,
            url: newLink.url,
            image: newLink.image,
          }),
        })

        if (!response.ok) throw new Error('Erro ao atualizar link')

        const updatedLink = await response.json()
        setLinks(links.map(link => 
          link.id === editingLink.id ? updatedLink : link
        ))
        setEditingLink(null)
        setNewLink({ title: '', url: '', image: '' })
        router.refresh()
      } catch (error) {
        console.error('Erro:', error)
        alert('Erro ao atualizar link')
      } finally {
        setIsLoading(false)
      }
    } else {
      // Adicionar novo link
      try {
        setIsLoading(true)
        const response = await fetch('/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newLink,
            profileId,
            order: links.length
          }),
        })

        if (!response.ok) throw new Error('Erro ao adicionar link')

        const addedLink = await response.json()
        setLinks([...links, addedLink])
        setNewLink({ title: '', url: '', image: '' })
        router.refresh()
      } catch (error) {
        console.error('Erro:', error)
        alert('Erro ao adicionar link')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleEditLink = (link) => {
    setEditingLink(link)
    setNewLink({
      title: link.title,
      url: link.url,
      image: link.image || ''
    })
  }

  const handleCancelEdit = () => {
    setEditingLink(null)
    setNewLink({ title: '', url: '', image: '' })
  }

  const handleDeleteLink = async (id) => {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Erro ao deletar link')

      setLinks(links.filter(link => link.id !== id))
      router.refresh()
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Seus Links</h2>
      
      {/* Lista de links existentes */}
      <div className="space-y-4 mb-[70px]">
        {links.map((link, index) => (
          <div key={link.id} className="bg-gray-50 rounded-lg overflow-hidden">
            {/* Container da imagem */}
            {link.image && (
              <div className="w-full h-[180px] bg-white flex justify-start">
                <img
                  src={link.image}
                  alt={link.title}
                  className="h-full object-contain"
                />
              </div>
            )}
            
            {/* Informações do link */}
            <div className="p-4">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">{link.title}</h3>
                <p className="text-sm text-gray-500 truncate">{link.url}</p>
                
                {/* Botões de ação */}
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => handleEditLink(link)}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário para adicionar/editar link */}
      <form onSubmit={handleSaveLink} className="space-y-4">
        {/* Preview da imagem */}
        <div>
          {newLink.image ? (
            <div className="w-full h-[180px] bg-white flex justify-start">
              <img
                src={newLink.image}
                alt="Link preview"
                className="h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-[180px] bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Imagem do link</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-blue-500 hover:text-blue-600 text-sm flex items-center gap-2"
            disabled={uploading}
          >
            {uploading ? (
              <span className="animate-pulse">Enviando...</span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span>Alterar imagem</span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Título do Link
          </label>
          <input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            URL
          </label>
          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Salvando...' : editingLink ? 'Salvar Alterações' : 'Adicionar Link'}
          </button>

          {editingLink && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
} 