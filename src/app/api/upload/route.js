import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { upload, getPublicUrl } from '@/lib/spaces';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    console.log('1. Iniciando upload...');
    
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('2. Erro: Usuário não autenticado');
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401 }
      );
    }

    // Verificar se o upload do Spaces está configurado
    if (!upload) {
      console.log('3. DigitalOcean Spaces não configurado, usando armazenamento local');
      return handleLocalUpload(request);
    }

    // Configurar o middleware de upload para o Spaces
    const uploadMiddleware = upload.single('file');
    
    // Processar o upload
    console.log('3. Processando upload para o Spaces...');
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

// Função para lidar com upload local quando o Spaces não está configurado
async function handleLocalUpload(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('Erro: Nenhum arquivo enviado');
      return new NextResponse(
        JSON.stringify({ error: "Nenhum arquivo enviado" }),
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Criar nome único para o arquivo
    const uniqueFilename = `${Date.now()}-${uuidv4()}-${file.name}`;
    
    // Salvar na pasta public/uploads
    const uploadDir = join(process.cwd(), 'public/uploads');

    // Garantir que o diretório existe
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Retornar URL relativa
    const imageUrl = `/uploads/${uniqueFilename}`;
    console.log('URL da imagem local gerada:', imageUrl);

    return new NextResponse(
      JSON.stringify({ url: imageUrl }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no upload local:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao fazer upload da imagem" }),
      { status: 500 }
    );
  }
} 