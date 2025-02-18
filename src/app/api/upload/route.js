import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401 }
      );
    }

    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return new NextResponse(
        JSON.stringify({ error: "Nenhum arquivo enviado" }),
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Criar nome único para o arquivo
    const uniqueFilename = `${Date.now()}-${file.name}`;
    
    // Salvar na pasta public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, uniqueFilename);
    
    await writeFile(filePath, buffer);

    // Retornar URL relativa
    const imageUrl = `/uploads/${uniqueFilename}`;

    return new NextResponse(
      JSON.stringify({ url: imageUrl }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no upload:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao fazer upload da imagem" }),
      { status: 500 }
    );
  }
} 