import { emit } from "process";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";

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

const getUserById = (id: number): User | undefined => {
    return userDb.getUserById(id);
}

export default {
    getAllUsers,
    registerUser,
    getUserById
} 