import { User } from "@/types";
import { json } from "stream/consumers";

const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const getUserByEmail = (email: string) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getUserById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const UserService = {
    getAllUsers,
    loginUser,
    registerUser,
    getUserByEmail,
    getUserById
};

export default UserService;