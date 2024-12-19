
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.stats.deleteMany();
    await prisma.workout.deleteMany();
    // await prisma.user.deleteMany();

    const hashedPasswordGertje = await bcrypt.hash("Albert1234", 10);
    const hashedPasswordSamson = await bcrypt.hash("Duvel1234", 10);
    const hashedPasswordStella = await bcrypt.hash("Stella1234", 10);

    const albert = await prisma.user.create({
        data: {
            email: "albert@admin.com",
            password: hashedPasswordGertje,
            role: "admin",
        },
    });

    const duvel = await prisma.user.create({
        data: {
            email: "duvel@trainer.com",
            password: hashedPasswordSamson,
            role: "trainer",
        },
    });

    const stella = await prisma.user.create({
        data: {
            email: "stella@email.com",
            password: hashedPasswordStella,
            role: "user"
        },
    });

    await prisma.profile.createMany({
        data: {
            firstName: "Albert",
            name: "Admin",
            dateOfBirth: new Date("2000-01-15"),
            userId: albert.id
        }
    })
    await prisma.profile.createMany({
        data: {
            firstName: "Duvel",
            name: "Trainer",
            dateOfBirth: new Date("2000-01-15"),
            userId: duvel.id
        }
    })
    await prisma.profile.createMany({
        data: {
            firstName: "Stella",
            name: "Artois",
            dateOfBirth: new Date("2000-01-15"),
            userId: stella.id
        }
    })


    await prisma.stats.createMany({
        data: [
            {
                weight: 60,
                length: 180,
                pr: 60,
                userId: stella.id,  
                date: new Date("2024-01-15"),
            },
            {
                weight: 65,
                length: 180,
                pr: 65,
                userId: stella.id, 
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