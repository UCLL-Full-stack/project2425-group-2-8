import { Stats } from "../model/Stats";

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

export default {
    addStats
}