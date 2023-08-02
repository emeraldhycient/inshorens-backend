// prisma.ts

import { PrismaClient } from '@prisma/client';

// Create a global variable to hold the singleton instance
let prismaInstance: PrismaClient | null = null;

// Function to get or create the Prisma Client instance
export const getPrisma = (): PrismaClient => {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient({
            log: ["query"]
        })
    }
    return prismaInstance;
};

// Function to gracefully disconnect the Prisma Client instance
export const disconnectPrisma = async () => {
    if (prismaInstance) {
        await prismaInstance.$disconnect();
        prismaInstance = null;
    }
};
