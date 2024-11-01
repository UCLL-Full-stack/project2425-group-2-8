const addStats = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/stats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const StatsService = {
    addStats,
};

export default StatsService;