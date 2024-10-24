import { Stats } from '../model/Stats';
import statsDb from '../repository/stats.db';
import { StatsInput } from '../types';

const addStats = async (statsInput: StatsInput): Promise<Stats> => {
    const { weight, length, pr, date} = statsInput;

    if (!weight || !length || !pr || !date) {
        throw new Error('All fields are required');
    }

    const newStats = new Stats({
        weight, 
        length,
        pr,
        date
    });

    return statsDb.addStats(newStats);
}

export default {
    addStats
}