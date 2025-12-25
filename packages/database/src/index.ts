import { PrismaClient } from "../generated/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Simple initialization. Prisma 7 MUST find DATABASE_URL in the process environment.
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "../generated/client";
