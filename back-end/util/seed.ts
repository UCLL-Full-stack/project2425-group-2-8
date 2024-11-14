

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();

    const gertje = await prisma.user.create({
        data: {
            email: "gertje@email.com",
            password: "gertje1234",
        },
    });

    
}