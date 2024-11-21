import { Workout } from "../model/Workout";
import database from './database';


const addWorkout = async (workout: Workout): Promise<Workout> => {
    try {
        const createdWorkout = await database.workout.create({
            data: {
                subject: workout.getSubject(),
                date: workout.getDate(),
                userId: workout.getUser()
            }
        });
        return Workout.from(createdWorkout);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

const getWorkoutsByUserId = async (userId: number): Promise<Workout[]> => {
    try {
        const workoutsPrisma = await database.workout.findMany({
            where: { userId }
        });
        return workoutsPrisma.map(workout => Workout.from(workout));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};



export default {
    addWorkout,
    getWorkoutsByUserId
}