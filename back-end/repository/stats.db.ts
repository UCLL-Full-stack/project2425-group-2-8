import { Stats } from "../model/Stats";
import database from '././database';

const allStats = [
    new Stats({
        weight: 60,
        length: 180,
        pr: 60,
        userId: 0
    }), 
    new Stats({
        weight: 65,
        length: 180,
        pr: 65,
        userId: 0
    })
];

const addStats = (stats: Stats): Stats => {
    allStats.push(stats);
    return stats;
}

const getStatsByUserId = async (userId: number): Promise<Stats[]> => {
    return allStats.filter(stat => stat.userId === userId);
    try {
        const statsPrisma = await database
    }
};

export default {
    addStats,
    getStatsByUserId
}