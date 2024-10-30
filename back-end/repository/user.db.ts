import { User } from "../model/User";

const allUsers = [
    new User({
        email: 'oussamma@gmail.com',
        password: 'fietsendief015'
    }),
    new User({
        email: 'gertje@gmail.com', 
        password: 'fietsgestolenLBozo1'
    })
];

const getAllUsers = (): User[] => {
    return allUsers;
}

const registerUser = (user: User): User => {
    allUsers.push(user);
    return user;
}

const getUserById = (id: number): User | undefined => {
    return allUsers.find(user => user.getId() == id);
}

const getUserByEmail = (email: string): User | undefined => {
    return allUsers.find(user => user.getEmail() === email);
}

export default {
    getAllUsers,
    registerUser,
    getUserById,
    getUserByEmail
}