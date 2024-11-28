
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.stats.deleteMany();
    await prisma.workout.deleteMany();
    await prisma.user.deleteMany();

    const gertje = await prisma.user.create({
        data: {
            email: "gertje@email.com",
            password: "fietsgestolenLBozo1",
            role: "guest",
        },
    });

    await prisma.stats.createMany({
        data: [
            {
                weight: 60,
                length: 180,
                pr: 60,
                userId: gertje.id,  
                date: new Date("2024-01-15"),
            },
            {
                weight: 65,
                length: 180,
                pr: 65,
                userId: gertje.id, 
                date: new Date("2024-02-15"),  
            },
        ],
    });

    await prisma.workout.createMany({
        data: [
            {
                subject: "chestday",
                date: new Date("2024-10-31"),
                userId: gertje.id,  
            },
            {
                subject: "backday",
                date: new Date("2025-10-10"),
                userId: gertje.id,  
            },
        ],
    });

    
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();