import { PrismaClient } from "@prisma/client";

// Previne múltiplas instâncias do Prisma Client em desenvolvimento
const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();

export const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 