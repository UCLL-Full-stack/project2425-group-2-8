import { User } from "../model/User";
import { Stats } from "../model/Stats";

// const oussama = new User({
//     email: 'oussama@gmail.com',
//     password: 'fietsendief015'
// });
// oussama.setStats(new Stats({
//         weight: 65,
//         length: 180,
//         pr: 65,
//         userId: 0
// }))

const gertje = new User({
    email: 'gertje@gmail.com', 
    password: 'fietsgestolenLBozo1'
});

const allUsers = [ gertje ];

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