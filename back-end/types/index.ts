type StatsInput = {
    id?: number;
    weight: number;
    length: number;
    pr: number;
    date: Date;
}

type ProfileInput = {
    id?: number; 
    firstName: string; 
    name: string;
    dateOfBirth: Date;
}

type WorkoutInput = {
    id?: number;
    subject: string;
    date: Date;
}

type UserInput = {
    id?: number; 
    email: string;
    password: string;
    profile: ProfileInput;
    workouts: WorkoutInput;
}

export {
    StatsInput,
    UserInput,
};