import { User } from "../model/User";

const allUsers = [];

const registerUser = (user: User): User => {
    allUsers.push(user);
    return user;
}

export default {
    registerUser
}