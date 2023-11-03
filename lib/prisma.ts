import { PrismaClient } from '@prisma/client'

const prismaClientSingleTon = () => {
    return new PrismaClient();
}

type prismaClientSingleTon =  ReturnType<typeof prismaClientSingleTon>

const globalForPrissma = globalThis as unknown as {
    prisma: prismaClientSingleTon | undefined
}

const prisma = globalForPrissma.prisma ?? prismaClientSingleTon();

export default prisma;

if(process.env.NODE_ENV !== 'production') {
    globalForPrissma.prisma = prisma;
}

