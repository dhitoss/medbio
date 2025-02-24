import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401 }
      );
    }

    const { id } = params;

    await prisma.link.delete({
      where: {
        id
      }
    });

    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error('Erro ao deletar link:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao deletar link" }),
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401 }
      );
    }

    const { id } = params;
    const data = await request.json();
    const { title, url, image } = data;

    const link = await prisma.link.update({
      where: { id },
      data: { title, url, image }
    });

    return new NextResponse(
      JSON.stringify(link),
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao atualizar link:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao atualizar link" }),
      { status: 500 }
    );
  }
} 