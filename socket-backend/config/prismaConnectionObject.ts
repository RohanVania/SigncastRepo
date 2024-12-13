import {PrismaClient} from "@prisma/client"

const prismaConnection = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
});

export default  prismaConnection;