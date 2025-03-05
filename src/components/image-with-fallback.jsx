"use client"

import { useState } from 'react';

export function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = '/placeholder-image.png', 
  className = '',
  ...props 
}) {
  const [error, setError] = useState(false);
  
  // Verificar se a URL é uma URL local que começa com /api/files ou /uploads
  const isLocalUrl = src && (src.startsWith('/api/files/') || src.startsWith('/uploads/'));
  
  // Se for uma URL local e não estiver em desenvolvimento, tentar usar o Spaces
  const imageUrl = isLocalUrl && process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_DO_SPACES_BUCKET}.${process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT}/uploads/${src.split('/').pop()}`
    : src;
  
  return (
    <img
      src={error ? fallbackSrc : imageUrl}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
} 