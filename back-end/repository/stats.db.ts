import { Stats } from "../model/Stats";
import database from '././database';



const addStats = async (stats: Stats): Promise<Stats> => {
    try {
        const createdStats = await database.stats.create({
            data: {
                weight: stats.getWeight(),
                length: stats.getLength(),
                pr: stats.getPr(),
                userId: stats.getUserId()
            }
        });
        return Stats.from(createdStats);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

const getStatsByUserId = async (userId: number): Promise<Stats[]> => {
    try {
        const statsPrisma = await database.stats.findMany({
            where: { userId }
        });
        return statsPrisma.map(stat => Stats.from(stat));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

export default {
    addStats,
    getStatsByUserId
}