type StatsInput = {
    id?: number;
    weight: number;
    length: number;
    pr: number;
    date: Date;
}

type UserInput = {
    id?: number; 
    email: string;
    password: string;
}

export {
    StatsInput,
    UserInput,
};