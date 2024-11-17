import { User } from "../model/User";
import { Stats } from "../model/Stats";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const registerUser = async (userData: { email: string, password: string }) => {
    return await prisma.user.create({
        data: userData
    });
};

const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
};

const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export default {
    getAllUsers,
    registerUser,
    getUserById,
    getUserByEmail
}