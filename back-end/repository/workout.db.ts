import { Workout } from "../model/Workout";
import database from './database';


const allWorkouts = [
    new Workout({
        subject: "chestday",
        date: new Date("2024-10-31"),
        userId: 1
    }),
    new Workout({
        subject: "backday",
        date: new Date("2025-10-10"),
        userId: 1
    })
];

const addWorkout = (workouts: Workout): Workout => {
    allWorkouts.push(workouts);
    return workouts
}

const getWorkoutsByUserId = (userId: number): Workout[] => {
    return allWorkouts.filter(workout => workout.userId === userId);
};



export default {
    addWorkout,
    getWorkoutsByUserId
}