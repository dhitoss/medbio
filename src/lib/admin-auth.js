import { hash, compare } from "bcryptjs"

// Hash da senha admin (EixoDigital2025) - nunca expor a senha original
const ADMIN_PASSWORD_HASH = "$2a$10$AS7S3m52d7IblRe/wTFckeGg7HWmIi1tMXeMf4EU3yZCCUhO.DwE2"

export async function generateAdminHash(password) {
  // Função para gerar o hash (apenas para setup inicial)
  return await hash(password, 10)
}

export async function verifyAdminPassword(password) {
  try {
    return await compare(password, ADMIN_PASSWORD_HASH)
  } catch (error) {
    console.error("Erro na verificação da senha admin:", error)
    return false
  }
}

export function generateAdminToken() {
  // Gera um token simples para sessão admin
  return Buffer.from(`admin_${Date.now()}_${Math.random()}`).toString('base64')
}

export function verifyAdminToken(token) {
  if (!token) return false

  try {
    const decoded = Buffer.from(token, 'base64').toString()
    return decoded.startsWith('admin_')
  } catch {
    return false
  }
}