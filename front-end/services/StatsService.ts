const addStats = async (data: { weight: number; length: number; pr: number; userId: number }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/stats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    });
};

const getStatsByUserId = async (userId: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/stats/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

const StatsService = {
    addStats,
    getStatsByUserId,
};

export default StatsService;