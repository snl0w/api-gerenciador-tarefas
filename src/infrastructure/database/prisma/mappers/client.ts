// src/infrastructure/database/prisma/client.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  // Opção para logar todas as queries executadas pelo Prisma
  log: ['query'],
});
