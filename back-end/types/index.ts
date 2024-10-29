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
}

type StatsInput = {
    id?: number;
    weigth: number;
    length: number;
    pr: number;
    date: Date;
    userInput: UserInput;
}

export {
    UserInput,
    ProfileInput,
    WorkoutInput,
    StatsInput
};