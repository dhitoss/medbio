import { writeFile, mkdir, access, readdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    console.log('1. Iniciando upload...');
    console.log('1.1. Diretório atual:', process.cwd());
    console.log('1.2. Conteúdo do diretório atual:', await readdir(process.cwd()));
    
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
    const uploadDir = join(process.cwd(), 'public/uploads');
    console.log('6. Diretório de upload:', uploadDir);

    // Verificar se o diretório public existe
    try {
      await access(join(process.cwd(), 'public'));
      console.log('6.0. Diretório public existe');
    } catch (err) {
      console.error('6.0. Erro: Diretório public não existe');
    }

    // Garantir que o diretório existe
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('6.1. Diretório de upload criado/verificado');
      console.log('6.2. Conteúdo do diretório uploads:', await readdir(uploadDir));
    } catch (err) {
      console.error('6.3. Erro ao criar diretório:', err);
    }

    const filePath = join(uploadDir, uniqueFilename);
    console.log('7. Caminho completo do arquivo:', filePath);
    
    await writeFile(filePath, buffer);
    console.log('8. Arquivo salvo com sucesso');

    // Verificar se o arquivo foi realmente salvo
    try {
      await access(filePath);
      console.log('8.1. Arquivo existe no caminho especificado');
    } catch (err) {
      console.error('8.2. Erro: Arquivo não encontrado após salvar');
    }

    // Retornar URL relativa
    const imageUrl = `/api/files/${uniqueFilename}`;
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