import { emit } from "process";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";
import statsDb from "../repository/stats.db";
import { AuthenticationResponse } from '../types';
import { generateJwtToken } from '../util/jwt';
import bcrypt from 'bcrypt';
import { Profile } from "../model/Profile";


const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
}



const registerUser = async (userInput: UserInput): Promise<User> => {
    const { email, password, role = "student" } = userInput;
    
    if (!email || !password) {
        throw new Error("Email and password can not be empty!")
    }

    const existingUser = await userDb.getUserByEmail(email);
    
    if (existingUser) {
        throw new Error("A user with this email already exists.");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password,
        role
    });


    return await userDb.registerUser(newUser);
}


const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    
    if (!user) {
        throw new Error(`User with ID ${id} does not exist.`);
    }

    return user;
}

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with Email ${email} does not exist!`);
    }

    return user;
}

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    if (!password) {
        throw new Error('Password is required.');
    }
    if (!email) {
        throw new Error('Email is required.');
    }
    const user = await getUserByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Incorect password');
    }

    const profile = user.getProfile();
    const fullname = profile 
        ? `${profile.getFirstName() || ''} ${profile.getName() || ''}`.trim() 
        : '';


    return {
        token: generateJwtToken({ email, role: user.getRole() }),
        email,
        fullname,
    };

};

export default {
    getAllUsers,
    registerUser,
    getUserById,
    authenticate,
    getUserByEmail
} 