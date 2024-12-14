import { Workout } from "../model/Workout"
import workoutDb from "../repository/workout.db";
import { WorkoutInput } from "../types"
import userService from "./user.service";

const addWorkout = async (workoutInput: WorkoutInput): Promise<Workout> => {
    const { subject, date, userIds } = workoutInput;

    if (!subject || !date) {
        throw new Error('All field are required');
    }
    
    if (!userIds) {
        throw new Error('A user must be given when entering stats')
    }

    for (const userId of userIds) {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
    }

    const newWorkout = new Workout({
        subject,
        date,
        userIds
    });

    workoutDb.addWorkout(newWorkout);
    return newWorkout
}

const getWorkoutsByUserId = async (userId: number): Promise<Workout[]> => {
    const workouts = await workoutDb.getWorkoutsByUserId(userId);
    
    if (!workouts || workouts.length === 0) {
        throw new Error("No workouts found for this user.");
    }

    return workouts;
};

export default {
    addWorkout,
    getWorkoutsByUserId
}