import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAdminToken } from "@/lib/admin-auth"

function verifyAdmin(request) {
  const token = request.cookies.get('admin-token')?.value
  return verifyAdminToken(token)
}

export async function GET(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        profile: {
          include: {
            links: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Remove senhas do retorno
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return NextResponse.json(usersWithoutPasswords)
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}