import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

    const data = await request.json();
    const { title, url, image, profileId, order } = data;

    const link = await prisma.link.create({
      data: {
        title,
        url,
        image,
        order,
        profileId
      }
    });

    return new NextResponse(
      JSON.stringify(link),
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao criar link:', error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao criar link" }),
      { status: 500 }
    );
  }
} 