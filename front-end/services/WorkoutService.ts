const addWorkout = async (data: { subject: string; date: string; userIds: Array<number>}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/workout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    });
}

const getWorkoutsByUserId = async (userId: number) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/workout/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

const WorkoutService = {
    addWorkout,
    getWorkoutsByUserId
};

export default WorkoutService;