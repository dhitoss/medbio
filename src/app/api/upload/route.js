import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { upload, getPublicUrl } from '@/lib/spaces';

export async function POST(request) {
  try {
    console.log('1. Iniciando upload para DigitalOcean Spaces...');
    
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('2. Erro: Usuário não autenticado');
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401 }
      );
    }

    // Configurar o middleware de upload
    const uploadMiddleware = upload.single('file');
    
    // Processar o upload
    console.log('3. Processando upload...');
    const result = await new Promise((resolve, reject) => {
      uploadMiddleware(request, {}, function(err) {
        if (err) {
          console.error('3.1. Erro no middleware de upload:', err);
          return reject(err);
        }
        resolve(this.req.file);
      });
    });
    
    console.log('4. Upload concluído com sucesso:', result);
    
    // Retornar a URL pública
    const imageUrl = getPublicUrl(result.key);
    console.log('5. URL da imagem gerada:', imageUrl);

    return new NextResponse(
      JSON.stringify({ url: imageUrl }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no upload:', error);
    console.error('Stack trace:', error.stack);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao fazer upload da imagem" }),
      { status: 500 }
    );
  }
} 