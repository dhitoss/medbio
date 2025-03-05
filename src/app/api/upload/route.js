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

    // Processar o upload para o Spaces
    console.log('3. Processando upload para o Spaces...');
    
    // Clonar a requisição para poder ler o formData
    const clonedRequest = request.clone();
    const formData = await clonedRequest.formData();
    const file = formData.get('file');
    
    if (!file) {
      console.log('Erro: Nenhum arquivo enviado');
      return new NextResponse(
        JSON.stringify({ error: "Nenhum arquivo enviado" }),
        { status: 400 }
      );
    }
    
    // Criar um buffer do arquivo
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${uuidv4()}-${file.name}`;
    const fileType = file.type;
    
    // Fazer upload diretamente usando o cliente S3
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: `uploads/${filename}`,
      Body: buffer,
      ACL: 'public-read',
      ContentType: fileType
    };
    
    // Importar o cliente S3 diretamente
    const { s3 } = await import('@/lib/spaces');
    
    if (!s3) {
      console.log('S3 client não está disponível, usando armazenamento local');
      return handleLocalUpload(request);
    }
    
    const result = await s3.upload(params).promise();
    console.log('4. Upload concluído com sucesso:', result);
    
    // Retornar a URL pública
    const imageUrl = getPublicUrl(result.Key);
    console.log('5. URL da imagem gerada:', imageUrl);

    return new NextResponse(
      JSON.stringify({ url: imageUrl }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no upload:', error);
    console.error('Stack trace:', error.stack);
    
    // Se houver erro no upload para o Spaces, tentar o upload local
    try {
      console.log('Tentando upload local após falha no Spaces');
      return await handleLocalUpload(request.clone());
    } catch (localError) {
      console.error('Erro também no upload local:', localError);
      return new NextResponse(
        JSON.stringify({ error: "Erro ao fazer upload da imagem" }),
        { status: 500 }
      );
    }
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