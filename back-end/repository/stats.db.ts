import { Stats } from "../model/Stats";
import database from '././database';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addStats = async (statsData: { weight: number, length: number, pr: number, userId: number }) => {
    return await prisma.stats.create({
        data: statsData,
    });
};

const getStatsByUserId = async (userId: number) => {
    return await prisma.stats.findMany({
        where: {
            userId,
        },
    });
};

export default {
    addStats,
    getStatsByUserId
}