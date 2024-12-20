type Role = 'admin' | 'user' | 'trainer';

type ProfileInput = {
    id?: number; 
    firstName?: string; 
    name?: string;
    dateOfBirth?: Date;
}

type WorkoutInput = {
    id?: number;
    subject: string;
    date: Date;
    userIds: Array<number>;
}

type UserInput = {
    id?: number; 
    email: string;
    password: string;
    role: Role;
    profile?: ProfileInput;
}

type StatsInput = {
    id?: number;
    weight: number;
    length: number;
    pr: number;
    userId: number;
}

type FeedbackInput = {
    id?: number;
    name: string;
    email: string;
    message: string;
    createdAt?: Date;
}

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: string
};

export {
    UserInput,
    ProfileInput,
    WorkoutInput,
    StatsInput,
    AuthenticationResponse, Role,
    FeedbackInput
};