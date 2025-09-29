import { NextResponse } from "next/server"
import { verifyAdminPassword, generateAdminToken } from "@/lib/admin-auth"

export async function POST(req) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json(
        { error: "Senha é obrigatória" },
        { status: 400 }
      )
    }

    const isValid = await verifyAdminPassword(password)

    if (!isValid) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      )
    }

    const token = generateAdminToken()

    const response = NextResponse.json({ success: true })

    // Define o cookie de sessão admin (httpOnly para segurança)
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8 // 8 horas
    })

    return response
  } catch (error) {
    console.error("Erro na autenticação admin:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  // Logout admin
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin-token')
  return response
}