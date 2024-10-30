import { Stats } from "../model/Stats";

const allStats: Stats[] = [];

const addStats = (stats: Stats): Stats => {
    allStats.push(stats);
    return stats;
}





export default {
    addStats
}