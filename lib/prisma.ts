// lib/prisma.ts

import { PrismaClient } from "@/src/generated/prisma/client";

declare global {
  // Evita criar múltiplas instâncias em desenvolvimento (Hot Reload)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"], // opcional, útil pra debug
  });

// Armazena globalmente em desenvolvimento para evitar múltiplas instâncias
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
