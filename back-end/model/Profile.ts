

export class Profile {
    private id? : number;
    private firstName : string;
    private name: string;
    private dateOfBirth: Date;

    constructor(profile: {
        id?: number;
        firstName : string;
        name : string;
        dateOfBirth : Date;
    }) {
        this.id = profile.id;
        this.firstName = profile.firstName;
        this.name = profile.name;
        this.dateOfBirth = profile.dateOfBirth;
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