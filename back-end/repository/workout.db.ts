import { Workout } from "../model/Workout";


const allWorkouts: Workout[] = [];

const addWorkout = (workouts: Workout): Workout => {
    allWorkouts.push(workouts);
    return workouts
}



export default {
    addWorkout
}