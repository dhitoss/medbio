import { PrismaClient } from "@prisma/client"

// Para evitar múltiplas instâncias do Prisma Client em desenvolvimento
const globalForPrisma = global

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ["query"],
  })
}

export const db = globalForPrisma.prisma 