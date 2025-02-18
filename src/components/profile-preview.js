'use client'

import { useState, useEffect } from "react";

// Hook personalizado para obter a URL base
function useBaseUrl() {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return baseUrl;
}

export function ProfilePreview({ profile, links }) {
  const baseUrl = useBaseUrl();

  return (
    <div className="min-h-[600px] w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        {/* Link público */}
        <div className="mb-4 text-sm">
          <p className="text-gray-500">Seu link público:</p>
          <a 
            href={`/${profile?.username}`}
            target="_blank"
            className="text-blue-500 hover:text-blue-600"
          >
            {`${baseUrl}/${profile?.username}`}
          </a>
        </div>

        {/* Avatar */}
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500">Sem foto</span>
          </div>
        )}
        <h2 className="text-xl font-bold">@{profile?.username}</h2>
        {profile?.bio && (
          <p className="text-gray-600 mt-2">{profile.bio}</p>
        )}
      </div>

      {/* Links */}
      <div className={`space-y-4 ${profile?.viewMode === 'image' ? 'flex flex-col gap-4' : ''}`}>
        {links.map((link) => (
          profile?.viewMode === 'image' ? (
            // Modo imagem
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {link.image ? (
                <div className="aspect-video w-full">
                  <img
                    src={link.image}
                    alt={link.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">{link.title}</span>
                </div>
              )}
            </a>
          ) : (
            // Modo texto (atual)
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-3 text-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {link.title}
            </a>
          )
        ))}
      </div>
    </div>
  )
} 