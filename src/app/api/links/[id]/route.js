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