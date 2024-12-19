
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.stats.deleteMany();
    await prisma.workout.deleteMany();
    // await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("Gertje1234", 10);

    const gertje = await prisma.user.create({
        data: {
            email: "gertje@email.com",
            password: hashedPassword,
            role: "admin",
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
                
            },
            {
                subject: "backday",
                date: new Date("2025-10-10"),
                
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