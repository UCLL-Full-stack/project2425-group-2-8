import { Stats } from '../model/Stats';
import statsDb from '../repository/stats.db';
import { StatsInput } from '../types';
import userService from './user.service';

const addStats = async (statsInput: StatsInput): Promise<Stats> => {
    const { weigth, length, pr, date, userInput} = statsInput;

    if (!weigth || !length || !pr || !date) {
        throw new Error('All fields are required');
    }
    const user = userService.getUserByEmail(userInput.email);

    if (!user) {
        throw new Error("User not found with the provided email.");
    }

    const newStats = new Stats({
        weigth, 
        length,
        pr,
        date,
        user
    });

    return statsDb.addStats(newStats);
}

export default {
    addStats
}