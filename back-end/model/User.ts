import { User as UserPrisma, Profile as ProfilePrisma, Stats as StatsPrisma } from '@prisma/client';


import { Profile } from "./Profile";
import { Workout } from "./Workout";
import { Stats } from "./Stats";

let idCounter = 0;

export class User {
    private id? : number;
    private email : string;
    private password : string;
    private profile?: Profile;
    private stats?: Stats[];

    static from ({ 
        id, 
        email, 
        password, 
        profile, 
        stats 
    }: UserPrisma & { profile?: ProfilePrisma | null; stats?: StatsPrisma[]; }): User {
        return new User ({
            id,
            email,
            password,
            profile: profile ? Profile.from(profile) : undefined,
            stats: stats && stats.length > 0 ? stats.map(stat => Stats.from(stat)) : undefined
        });
    }

    constructor(user: { id?: number; email: string; password: string; profile?: Profile; stats?: Stats[]}) {
        this.validate(user);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;

        if (user.profile) {
            this.setProfile(user.profile);
        }

        if (user.stats) {
            this.setStats(user.stats);
        }
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

    setStats(stats: Stats[]): void {
        this.stats = stats;
    }

    getStats(): Stats[] | undefined {
        return this.stats;
    }

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.profile === user.getProfile()
        );
    }
}