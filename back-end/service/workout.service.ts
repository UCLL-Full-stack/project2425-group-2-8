import { Workout } from "../model/Workout"
import workoutDb from "../repository/workout.db";
import { WorkoutInput } from "../types"
import userService from "./user.service";

const addWorkout = async (workoutInput: WorkoutInput): Promise<Workout> => {
    const { subject, date, userId } = workoutInput;

    if (!subject || !date) {
        throw new Error('All field are required');
    }
    const user = await userService.getUserById(userId);
    
    if (!user) {
        throw new Error('User not found with the provided id');
    }

    const newWorkout = new Workout({
        subject,
        date,
        userId
    });

    workoutDb.addWorkout(newWorkout);
    user.addWorkout(newWorkout);
    return newWorkout
}

export default {
    addWorkout
}