import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { verifyAdminToken } from "@/lib/admin-auth"

function verifyAdmin(request) {
  const token = request.cookies.get('admin-token')?.value
  return verifyAdminToken(token)
}

export async function DELETE(req, { params }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const { id } = params

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    // Delete o usuário (cascade vai deletar profile e links automaticamente)
    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir usuário:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function PATCH(req, { params }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const { id } = params
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json(
        { error: "Nova senha é obrigatória" },
        { status: 400 }
      )
    }

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    // Hash da nova senha
    const hashedPassword = await hash(password, 10)

    // Atualiza a senha
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao alterar senha:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}