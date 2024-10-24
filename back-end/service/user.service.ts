import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";

const registerUser = async (userInput: UserInput): Promise<User> => {
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

export default {
    registerUser
}