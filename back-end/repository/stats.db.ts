import { Stats } from "../model/Stats";
import database from '././database';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const addStats = async (statsData: { weight: number, length: number, pr: number, userId: number }): Promise<Stats> => {
    const createdStats = await prisma.stats.create({
        data: statsData,
    });
    return Stats.from(createdStats);  
};

const getStatsByUserId = async (userId: number): Promise<Stats[]> => {
    const userStats = await prisma.stats.findMany({
        where: {
            userId,
        },
    });
    return userStats.map(Stats.from); 
};

export default {
    addStats,
    getStatsByUserId
}