import { User } from "./User";


export class Workout {
    private id?: number;
    private subject: string;
    private date: Date;
    private userId: number;

    constructor(workout: { id?: number; subject: string; date: Date; userId: number}) {
        this.validate(workout);


        this.id = workout.id;
        this.subject = workout.subject;
        this.date = workout.date;
        this.userId = workout.userId;
    }

    validate(workout: { subject: string; date: Date; userId: number }) {
        if (!workout.subject) {
            throw new Error('Subject is required')
        }

        if (!workout.date) {
            throw new Error ('Date is required')
        }

        if (!workout.userId) {
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

    getUser(): number {
        return this.userId;
    }

    equals(workout: Workout): boolean {
        return (
            this.subject === workout.getSubject() &&
            this.date === workout.getDate() &&
            this.userId === workout.getUser()
        );
    }
}