import { Profile } from "./Profile";
import { Workout } from "./Workout";
import { Stats } from "./Stats";

let idCounter = 0;

export class User {
    private id? : number;
    private email : string;
    private password : string;
    private profile?: Profile;
    private workouts: Workout[];
    private stats: Stats[];

    constructor(user: { email: string; password: string;}) {
        this.validate(user);

        this.id = idCounter++;
        this.email = user.email;
        this.password = user.password;
        this.workouts = [];
        this.stats = [];
    }

    

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

    getProfile(): Profile | undefined {
        return this.profile;
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

    addStats(stat: Stats): void { 
        this.stats.push(stat);
    }

    getStats(): Stats[] { 
        return this.stats;
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