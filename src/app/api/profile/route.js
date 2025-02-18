import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401 }
      );
    }

    const data = await request.json();
    const { userId, username, bio, avatar, viewMode } = data;

    // Validar username
    if (!username) {
      return new NextResponse(
        JSON.stringify({ error: "Username é obrigatório" }),
        { status: 400 }
      );
    }

    // Verificar se o username segue um padrão válido
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return new NextResponse(
        JSON.stringify({ 
          error: "Username deve conter apenas letras, números, _ ou -, e ter entre 3 e 20 caracteres" 
        }),
        { status: 400 }
      );
    }

    // Verificar se o username já existe (excluindo o usuário atual)
    const existingProfile = await prisma.profile.findFirst({
      where: {
        username: username,
        NOT: {
          userId: userId
        }
      }
    });

    if (existingProfile) {
      return new NextResponse(
        JSON.stringify({ error: "Username já está em uso" }),
        { status: 400 }
      );
    }

    // Atualizar ou criar o perfil
    const updatedProfile = await prisma.profile.update({
      where: {
        userId: userId
      },
      data: {
        username,
        bio,
        avatar,
        viewMode
      }
    });

    return new NextResponse(
      JSON.stringify(updatedProfile),
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao atualizar perfil" }),
      { status: 500 }
    );
  }
} 