import { emit } from "process";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";
import statsDb from "../repository/stats.db";

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
} 



const registerUser = async (userInput: UserInput): Promise<User> => {
    
    const { email, password } = userInput;

    if (!email || !password) {
        throw new Error("Email and password can not be empty!")
    }

    const existingUser = userDb.getUserByEmail(email);
    if (existingUser) {
        throw new Error("A user with this email already exists.");
    }

    const newUser = new User({
        email, 
        password
    })

    return userDb.registerUser(newUser);
}


const getUserById = (id: number): User => {
    const user = userDb.getUserById(id);
    if (!user) {
        throw new Error(`User with ID ${id} does not exist.`);
    }
    
    return user;
}

export default {
    getAllUsers,
    registerUser,
    getUserById
} 