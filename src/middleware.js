import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(request) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/eixo-criar-conta"

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/eixo-criar-conta', '/dashboard/:path*']
} 