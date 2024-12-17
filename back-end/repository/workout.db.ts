import { Workout } from '../model/Workout';
import database from './database';

const addWorkout = async (workout: Workout): Promise<Workout> => {
    try {
        const createdWorkout = await database.workout.create({
            data: {
                subject: workout.getSubject(),
                date: workout.getDate(),
                users: {
                    // connect: users.map((user) => ({ id: user.getId() })),
                    connect: workout.getUsers().map((user) => ({ id: user.getId() })),
                },
            },
            include: { users: { include: { profile: true } } },
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
            where: {
                users: {
                    some: { id: userId },
                },
            },
            include: {
                users: {
                    include: { profile: true },
                },
            },
        });
        return workoutsPrisma.map((workout) => Workout.from(workout));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

const getWorkoutById = async (workoutId: number): Promise<Workout> => {
    try {
        const workoutPrisma = await database.workout.findUnique({
            where: {
                id: workoutId,
            },
            include: {
                users: {
                    include: { profile: true},
                },
            },
        });
        if (!workoutPrisma) {
            throw new Error(`Workout with ${workoutId} could not be found`);
        }
        return Workout.from(workoutPrisma);
    } catch (error) {
        console.log(error);
        throw new Error("Database error. See server log for details");
    }
};

const deleteWorkout = async (workout: Workout): Promise<string> => {
    try {
        await database.workout.delete({
            where: {
                id: workout.getId(),
            },
        });
        return `Workout with ID ${workout.getId()} has been successfully deleted.`;
    } catch (error) {
        console.error("Error deleting workout:", error);
        throw new Error("Database error. Workout could not be deleted.");
    }
}

export default {
    addWorkout,
    getWorkoutsByUserId,
    getWorkoutById,
    deleteWorkout
};
