import { User as UserPrisma, Profile as ProfilePrisma, Stats as StatsPrisma, Workout as WorkoutPrisma } from '@prisma/client';


export class Workout {
    private id?: number;
    private subject: string;
    private date: Date;
    public userId: number;

    static from ({ 
        id,
        subject,
        date,
        userId,
    }: WorkoutPrisma & {}) {
        return new Workout({
            id,
            subject,
            date,
            userId
        });
    } 

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
            throw new Error('Date is required')
        }

        
        if (workout.userId === undefined || workout.userId === null) {
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