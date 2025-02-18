import { db } from "@/lib/db"
import { hash } from "bcryptjs"

async function createUser() {
  try {
    const hashedPassword = await hash("52002009", 10)
    
    await db.user.create({
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
    await db.$disconnect()
  }
}

createUser() 