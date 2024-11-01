export type Stats = {
    id? : number;
    weight : number;
    length : number;
    pr: number
    date: Date;
    userId: number;
};

export type User = {
    id? : number;
    email : string;
    password : string;
    profile?: Profile;
    stats?: Stats;
};

export type Profile = {
    id?: number;
    firstName: string;
    name: string;
    dateOfBirth: Date;
    user: User;

};