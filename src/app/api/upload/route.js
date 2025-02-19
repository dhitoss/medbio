import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

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

    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      console.log('3. Erro: Nenhum arquivo enviado');
      return new NextResponse(
        JSON.stringify({ error: "Nenhum arquivo enviado" }),
        { status: 400 }
      );
    }

    console.log('4. Arquivo recebido:', file.name);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Criar nome único para o arquivo
    const uniqueFilename = `${Date.now()}-${file.name}`;
    console.log('5. Nome único gerado:', uniqueFilename);
    
    // Salvar na pasta public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, uniqueFilename);
    
    console.log('6. Diretório de upload:', uploadDir);
    console.log('7. Caminho completo do arquivo:', filePath);
    
    await writeFile(filePath, buffer);
    console.log('8. Arquivo salvo com sucesso');

    // Retornar URL relativa
    const imageUrl = `/uploads/${uniqueFilename}`;
    console.log('9. URL da imagem gerada:', imageUrl);

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