import { createReadStream } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { stat } from 'fs/promises';

export async function GET(request, { params }) {
  const filePath = join(process.cwd(), 'public', 'uploads', params.path.join('/'));
  
  try {
    // Verificar se o arquivo existe localmente
    await stat(filePath);
    
    const stream = createReadStream(filePath);
    
    // Determinar o tipo MIME baseado na extensão
    const ext = filePath.split('.').pop().toLowerCase();
    const mimeTypes = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml'
    };
    
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Retornar o arquivo com o tipo MIME correto
    return new NextResponse(stream, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (error) {
    console.error('Erro ao servir arquivo:', error);
    
    // Se o arquivo não for encontrado localmente e as variáveis do Spaces estiverem configuradas,
    // redirecionar para o Spaces
    if (
      process.env.DO_SPACES_ENDPOINT && 
      process.env.DO_SPACES_BUCKET
    ) {
      const filename = params.path.join('/');
      const spacesUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/uploads/${filename}`;
      
      return NextResponse.redirect(spacesUrl);
    }
    
    // Se não for possível redirecionar para o Spaces, retornar 404
    return new NextResponse('File not found', { status: 404 });
  }
} 