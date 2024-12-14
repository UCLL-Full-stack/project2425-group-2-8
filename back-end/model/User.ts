import { User as UserPrisma, Profile as ProfilePrisma, Stats as StatsPrisma } from '@prisma/client';


import { Profile } from "./Profile";
import { Workout } from "./Workout";
import { Stats } from "./Stats";
import { Role } from '../types';
import { ro } from 'date-fns/locale';

let idCounter = 0;

export class User {
    private id? : number;
    private email : string;
    private password : string;
    private role : Role;
    private profile?: Profile;
    private stats?: Stats[];

    static from ({ 
        id, 
        email, 
        password, 
        role,
        profile, 
        stats 
    }: UserPrisma & { profile: ProfilePrisma | null; stats?: StatsPrisma[]; }): User {
        return new User ({
            id,
            email,
            password,
            role: role as Role,
            profile: profile ? Profile.from(profile) : Profile.default(),
            stats: stats && stats.length > 0 ? stats.map(stat => Stats.from(stat)) : undefined
        });
    }

    constructor(user: { id?: number; email: string; password: string; role: Role; profile?: Profile; stats?: Stats[]}) {
        this.validate(user);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;

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
        
        if (!user.password?.trim()) {
            throw new Error('Password is required');
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
    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.profile === user.getProfile()
        );
    }
}