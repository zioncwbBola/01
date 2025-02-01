// // src\lib\prisma.ts
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query", "info", "warn", "error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Instanciando o PrismaClient de forma otimizada (usando cache global em desenvolvimento)
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Log de queries para debug
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // Cache no ambiente de desenvolvimento

export default prisma;
