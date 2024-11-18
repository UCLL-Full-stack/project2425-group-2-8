import { emit } from "process";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";
import statsDb from "../repository/stats.db";


const getAllUsers = async (): Promise<User[]> => {
    const users = await userDb.getAllUsers(); 
    return users.map(User.from); 
};



const registerUser = async (userInput: UserInput): Promise<User> => {
    const { email, password } = userInput;

    if (!email || !password) {
        throw new Error("Email and password cannot be empty!");
    }

    const existingUser = await userDb.getUserByEmail(email);
    if (existingUser) {
        throw new Error("A user with this email already exists.");
    }

    const createdUser = await userDb.registerUser({ email, password });
    return User.from(createdUser); 
};


const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id); 
    if (!user) {
        throw new Error(`User with ID ${id} does not exist.`);
    }
    return User.from(user); 
};

export default {
    getAllUsers,
    registerUser,
    getUserById
} 