import { User } from "../model/User";

const allUsers: User[] = [];

const registerUser = (user: User): User => {
    allUsers.push(user);
    return user;
}

const getUserByEmail = (email: string): User => {
    const result = allUsers.find(user => user.getEmail() === email); 
    if (!result) {
        throw new Error("User is not found by this email.")
    }
    return result;
}

export default {
    registerUser,
    getUserByEmail
}