import { Workout } from "../model/Workout";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



const addWorkout = async (workoutData: { subject: string, date: Date, userId: number }) => {
    return await prisma.workout.create({
        data: workoutData,
    });
};

const getWorkoutsByUserId = async (userId: number) => {
    return await prisma.workout.findMany({
        where: {
            userId,
        },
    });
};



export default {
    addWorkout,
    getWorkoutsByUserId
}