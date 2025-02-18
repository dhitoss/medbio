import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Usuário hardcoded para exemplo
const VALID_USER = {
  email: "jaime@gmail.com",
  password: "52002009"
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (email === VALID_USER.email && password === VALID_USER.password) {
      // Criar uma sessão simples com cookies
      const cookieStore = await cookies()
      await cookieStore.set("auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
} 