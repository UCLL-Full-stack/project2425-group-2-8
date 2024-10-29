import { emit } from "process";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";

const registerUser = async (userInput: UserInput): Promise<User> => {
    console.log("debug");
    const { email, password } = userInput;

    if (!email || !password) {
        throw new Error("Email and password can not be empty!")
    }

    const newUser = new User({
        email, 
        password
    })

    return userDb.registerUser(newUser);
}

const getUserByEmail = (email: string): User => {
    return userDb.getUserByEmail(email);
}

export default {
    registerUser,
    getUserByEmail
} 