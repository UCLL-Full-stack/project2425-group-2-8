import { User } from "./User";


export class Profile {
    private id?: number;
    private firstName: string;
    private name: string;
    private dateOfBirth: Date;
    private user: User;

    constructor(profile: { id?: number; firstName: string; name: string; dateOfBirth: Date; user: User; }) {
        this.validate(profile);

        this.id = profile.id;
        this.firstName = profile.firstName;
        this.name = profile.name;
        this.dateOfBirth = profile.dateOfBirth;
        this.user = profile.user;
    }

    validate(profile: { firstName: string; name: string; dateOfBirth: Date; user: User; }) {
        if (!profile.firstName) {
            throw new Error('First name is required')
        }
        if (!profile.name) {
            throw new Error('Name is required')
        }
        if (!profile.dateOfBirth) {
            throw new Error('Date of birth is required')
        }
        
        if(!profile.user) {
            throw new Error('User is required')
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

    getUser(): User {
        return this.user;
    }

    equals(profile: Profile): boolean {
        return (
            this.firstName === profile.getFirstName() &&
            this.name === profile.getName() &&
            this.dateOfBirth === profile.getDateOfBirth() &&
            this.user === profile.getUser()
        );
    }
}