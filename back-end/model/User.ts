export class User {
    private id? : number;
    private email : string;
    private password : string;

    constructor(user: {
        id?: number;
        email: string;
        password: string;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
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

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        );
    }
}