import { db } from "./db"
import { hash } from "bcrypt"

export async function createUser({ email, password, name }) {
  // Verifica se já existe um usuário com este email
  const exists = await db.user.findUnique({
    where: { email }
  })

  if (exists) {
    throw new Error("Email já cadastrado")
  }

  // Hash da senha
  const hashedPassword = await hash(password, 10)

  // Cria o usuário
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  // Remove a senha do objeto retornado
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
} 