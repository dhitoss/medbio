'use client'

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Hook personalizado para obter a URL base
function useBaseUrl() {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return baseUrl;
}

export function ProfileForm({ initialData, userId }) {
  const router = useRouter();
  const baseUrl = useBaseUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: initialData?.username || '',
    bio: initialData?.bio || '',
    avatar: initialData?.avatar || '',
    viewMode: initialData?.viewMode || 'text'
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Validação do username em tempo real
  const validateUsername = (username) => {
    if (username.length < 3) {
      return "Username deve ter pelo menos 3 caracteres";
    }
    if (username.length > 20) {
      return "Username deve ter no máximo 20 caracteres";
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return "Username deve conter apenas letras, números, _ ou -";
    }
    return "";
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value.toLowerCase();
    setFormData({ ...formData, username: newUsername });
    setError(validateUsername(newUsername));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError("Arquivo muito grande. Máximo de 5MB.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      const data = await response.json();
      
      // Atualiza o estado com a URL da imagem
      setFormData(prev => ({
        ...prev,
        avatar: data.url
      }));
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    try {
      setIsLoading(true);
      console.log('Enviando dados:', formData);
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao atualizar perfil');
      }

      router.refresh();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Upload */}
      <div className="text-center">
        <div className="relative inline-block">
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
              <span className="text-gray-500">Sem foto</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-4 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            disabled={uploading}
          >
            {uploading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Nome de usuário
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={handleUsernameChange}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          required
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Este será seu link público: {baseUrl}/{formData.username}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Conte um pouco sobre você..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Modo de Visualização
        </label>
        <select
          value={formData.viewMode}
          onChange={(e) => setFormData({ ...formData, viewMode: e.target.value })}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="text">Texto</option>
          <option value="image">Imagem</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || error}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </form>
  );
} 