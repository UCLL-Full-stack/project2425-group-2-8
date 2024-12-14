import { User as UserPrisma, Profile as ProfilePrisma, Stats as StatsPrisma, Workout as WorkoutPrisma } from '@prisma/client';


export class Workout {
    private id?: number;
    private subject: string;
    private date: Date;
    public userIds: Array<number>;

    static from ({ 
        id,
        subject,
        date,
        users,
    }: WorkoutPrisma & { users: { id: number }[] }) {
        const userIds = users.map(user => user.id);

        return new Workout({
            id,
            subject,
            date,
            userIds
        });
    } 

    constructor(workout: { id?: number; subject: string; date: Date; userIds: Array<number>}) {
        this.validate(workout);


        this.id = workout.id;
        this.subject = workout.subject;
        this.date = workout.date;
        this.userIds = workout.userIds;
    }

    validate(workout: { subject: string; date: Date; userIds: Array<number> }) {
        if (!workout.subject) {
            throw new Error('Subject is required')
        }

        if (!workout.date) {
            throw new Error('Date is required')
        }

        
        if (workout.userIds === undefined || workout.userIds === null || workout.userIds.length == 0) {
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

    getUsers(): Array<number> {
        return this.userIds;
    }

    equals(workout: Workout): boolean {
        return (
            this.subject === workout.getSubject() &&
            this.date === workout.getDate() &&
            this.userIds === workout.getUsers()
        );
    }
}