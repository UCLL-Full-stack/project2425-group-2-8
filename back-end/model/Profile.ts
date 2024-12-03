import { User } from "./User";
import { User as UserPrisma, Profile as ProfilePrisma, Stats as StatsPrisma } from '@prisma/client';


export class Profile {
    private id?: number;
    private firstName: string;
    private name: string;
    private dateOfBirth: Date;

    static from ({
        id, 
        firstName,
        name,
        dateOfBirth
    }: ProfilePrisma & { userId?:number }): Profile | null {
        return new Profile({
            id,
            firstName: firstName || '',
            name: name || '',
            dateOfBirth: dateOfBirth || new Date()
        });
    }

    constructor(profile: { id?: number; firstName: string; name: string; dateOfBirth: Date;}) {
        this.validate(profile);

        this.id = profile.id;
        this.firstName = profile.firstName;
        this.name = profile.name;
        this.dateOfBirth = profile.dateOfBirth;
    }

    validate(profile: { firstName: string; name: string; dateOfBirth: Date;}) {
        if (!profile.firstName) {
            throw new Error('First name is required')
        }
        if (!profile.name) {
            throw new Error('Name is required')
        }
        if (!profile.dateOfBirth) {
            throw new Error('Date of birth is required')
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getName(): string {
        return this.name;
    }

    getDateOfBirth(): Date {
        return this.dateOfBirth;
    }
    equals(profile: Profile): boolean {
        return (
            this.firstName === profile.getFirstName() &&
            this.name === profile.getName() &&
            this.dateOfBirth === profile.getDateOfBirth()
        );
    }
}