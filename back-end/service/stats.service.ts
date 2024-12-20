import { Stats } from '../model/Stats';
import statsDb from '../repository/stats.db';
import { StatsInput } from '../types';
import userService from './user.service';

const addStats = async (statsInput: StatsInput): Promise<Stats> => {
    const { weight, length, pr, userId} = statsInput;
    
    if (!weight || !length || !pr) {
        throw new Error('All fields are required');
    }
    if (!userId) {
        throw new Error('A user must be given when entering stats')
    }
    const user = await userService.getUserById(userId);

    if (!user) {
        throw new Error("User not found with the provided id.");
    }

    const newStats = new Stats({
        weight, 
        length,
        pr,
        userId
    });

    const createdStats = await statsDb.addStats(newStats);  
    return createdStats;
}

const getStatsByUserId = async (userId: number): Promise<Stats[]> => {

    const userStats = await statsDb.getStatsByUserId(userId);

    if (!userStats || userStats.length === 0) {
        throw new Error("No stats found for this user.");
    }
    return userStats;
};

export default {
    addStats,
    getStatsByUserId
}