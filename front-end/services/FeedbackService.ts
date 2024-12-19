const addFeedback = async (data: { name: string; email: string; message: string }) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
}

const getFeedback = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser)?.token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/feedback`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const FeedbackService = {
    addFeedback,
    getFeedback
}

export default FeedbackService;