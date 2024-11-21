import { User } from "../model/User";
import { Stats } from "../model/Stats";
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: { profile: true, stats: true, workouts: true }
        });
        return usersPrisma.map(user => User.from(user));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

const registerUser = async (user: User): Promise<User> => {
    try {
        const createdUser = await database.user.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword()
            }
        });
        return User.from(createdUser);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: { profile: true, stats: true, workouts: true }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
            include: { profile: true, stats: true, workouts: true }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

export default {
    getAllUsers,
    registerUser,
    getUserById,
    getUserByEmail
}