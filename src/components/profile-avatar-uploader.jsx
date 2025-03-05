"use client"

import { useState } from 'react';
import { ImageUploader } from './image-uploader';
import { Button } from './ui/button';

export function ProfileAvatarUploader({ initialAvatar, onSave }) {
  const [avatar, setAvatar] = useState(initialAvatar || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleUploadComplete = (imageUrl) => {
    setAvatar(imageUrl);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(avatar);
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h2 className="text-xl font-semibold">Foto de Perfil</h2>
      
      <div className="flex flex-col items-center gap-4">
        {avatar && (
          <div className="relative w-32 h-32 overflow-hidden rounded-full border-2 border-gray-200">
            <img 
              src={avatar} 
              alt="Avatar" 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <ImageUploader 
          onUploadComplete={handleUploadComplete} 
          className="mt-2"
        />
      </div>
      
      <Button 
        onClick={handleSave} 
        disabled={isSaving || !avatar}
        className="mt-4"
      >
        {isSaving ? 'Salvando...' : 'Salvar Avatar'}
      </Button>
    </div>
  );
} 