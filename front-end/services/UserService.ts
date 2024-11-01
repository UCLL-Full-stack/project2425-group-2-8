const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const UserService = {
    getAllUsers,
};

export default UserService;