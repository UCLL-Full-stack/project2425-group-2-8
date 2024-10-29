import { User } from "../model/User";

const allUsers: User[] = [];

const registerUser = (user: User): User => {
    allUsers.push(user);
    return user;
}

const getUserByEmail = (email: string): User | undefined => {
    return allUsers.find(user => user.getEmail() === email);
}

export default {
    registerUser,
    getUserByEmail
}