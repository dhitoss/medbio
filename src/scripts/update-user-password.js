import { db } from "@/lib/db"
import { hash } from "bcryptjs"

async function updateUserPassword() {
  try {
    const password = "52002009" // sua senha
    const hashedPassword = await hash(password, 10)
    
    await db.user.update({
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
    await db.$disconnect()
  }
}

updateUserPassword() 