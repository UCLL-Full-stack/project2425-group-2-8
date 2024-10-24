import { User } from "./User";


export class Workout {
    private id? : number;
    private subject : string;
    private date : Date;
    private user: User;

    constructor(workout: { id?: number; subject: string; date: Date; user: User}) {
        this.validate(workout);


        this.id = workout.id;
        this.subject = workout.subject;
        this.date = workout.date;
        this.user = workout.user;
    }

    validate(workout: { subject: string; date: Date; user: User }) {
        if (!workout.subject) {
            throw new Error('Subject is required')
        }

        if (!workout.date) {
            throw new Error ('Date is required')
        }

        if (!workout.user) {
            throw new Error('User is required')
        }

    }

    getId(): number | undefined {
        return this.id;
    }

    getSubject(): string {
        return this.subject;
    }

    getDate(): Date {
        return this.date;
    }

    getUser(): User {
        return this.user;
    }

    equals(workout: Workout): boolean {
        return (
            this.subject === workout.getSubject() &&
            this.date === workout.getDate() &&
            this.user === workout.getUser()
        );
    }
}