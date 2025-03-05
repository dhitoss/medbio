import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/spaces';

export async function PUT(request) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Obter dados do corpo da requisição
    const { avatarUrl } = await request.json();
    
    if (!avatarUrl) {
      return NextResponse.json(
        { success: false, error: 'URL do avatar é obrigatória' },
        { status: 400 }
      );
    }

    // Buscar perfil atual para verificar se já existe um avatar
    const currentProfile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { avatar: true }
    });

    // Se houver um avatar antigo e ele estiver no Spaces, excluir
    if (currentProfile?.avatar && currentProfile.avatar.includes(process.env.DO_SPACES_BUCKET)) {
      // Extrair a chave do arquivo da URL
      const key = currentProfile.avatar.split(`${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/`)[1];
      if (key) {
        await deleteFile(key);
      }
    }

    // Atualizar o perfil com o novo avatar
    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: { avatar: avatarUrl },
    });

    return NextResponse.json({ 
      success: true, 
      profile: {
        avatar: updatedProfile.avatar
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar avatar:', error);
    return NextResponse.json(
      { success: false, error: 'Falha ao atualizar avatar' },
      { status: 500 }
    );
  }
} 