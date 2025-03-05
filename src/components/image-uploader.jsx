"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";

export function ImageUploader({ onUploadComplete, className }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Criar preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Falha no upload');
      }

      onUploadComplete(data.imageUrl);
    } catch (err) {
      setError('Erro ao fazer upload da imagem');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4">
        {preview && (
          <div className="relative w-32 h-32 overflow-hidden rounded-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="flex flex-col items-center gap-2">
          <label className="cursor-pointer">
            <Button 
              type="button" 
              variant="outline" 
              disabled={uploading}
              className="relative"
            >
              {uploading ? 'Enviando...' : 'Selecionar imagem'}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUpload} 
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </Button>
          </label>
          
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
} 