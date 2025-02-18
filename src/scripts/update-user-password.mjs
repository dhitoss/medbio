import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function updateUserPassword() {
  try {
    const password = "52002009" // sua senha
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await prisma.user.update({
      where: {
        email: "jaime@gmail.com"
      },
      data: {
        hashedPassword
      }
    })

    console.log("Senha atualizada com sucesso!")
  } catch (error) {
    console.error("Erro ao atualizar senha:", error)
  } finally {
    await prisma.$disconnect()
  }
}

updateUserPassword() 