import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash("52002009", 10)
    
    await prisma.user.create({
      data: {
        email: "jaime@gmail.com",
        name: "Jaime",
        hashedPassword
      }
    })

    console.log("Usuário criado com sucesso!")
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createUser() 