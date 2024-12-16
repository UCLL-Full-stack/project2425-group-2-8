type Role = 'admin' | 'student' | 'lecturer' | 'guest';

type ProfileInput = {
    id?: number; 
    firstName?: string; 
    name?: string;
    dateOfBirth?: Date;
}

type WorkoutInput = {
    id?: number;
    subject?: string;
    date?: Date;
    userIds?: Array<number>;
}

type UserInput = {
    id?: number; 
    email?: string;
    password?: string;
    role?: Role;
    profile?: ProfileInput;
}

type StatsInput = {
    id?: number;
    weight?: number;
    length?: number;
    pr?: number;
    userId?: number;
}

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
};

export {
    UserInput,
    ProfileInput,
    WorkoutInput,
    StatsInput,
    AuthenticationResponse, Role
};