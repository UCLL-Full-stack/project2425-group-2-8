import { error } from "console";
import { Profile } from "./Profile";
import { Workout } from "./Workout";

export class User {
    private id? : number;
    private email : string;
    private password : string;
    private profile?: Profile;
    private workouts: Workout[];

    constructor(user: { id?: number; email: string; password: string;}) {
        this.validate(user);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.workouts = [];
    }

    // constructor(user: { id?: number; email: string; password: string; profile: Profile; workouts: Array<Workout>; }) {
    //     this.validate(user);

    //     this.id = user.id;
    //     this.email = user.email;
    //     this.password = user.password;
    //     this.profile = user.profile;
    //     this.workouts = user.workouts;
    // }

    validate(user: { email: string; password: string; }) {
        if (!user.email) {
            throw new Error('Email is required!');
        }
        
        if (!user.password) {
            throw new Error('Password is required!');
        }

    }
    
    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile | void {
        if (!this.profile) {
            return this.profile;
        }
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

    getWorkout(): Array<Workout> {
        return this.workouts;
    }

    addWorkout(workout: Workout): void {
        this.workouts.push(workout);
    }

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.profile === user.getProfile() &&
            this.workouts === user.getWorkout()
        );
    }
}