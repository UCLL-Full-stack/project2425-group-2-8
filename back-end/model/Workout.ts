import { User as UserPrisma, Profile as ProfilePrisma, Stats as StatsPrisma, Workout as WorkoutPrisma } from '@prisma/client';
import { User } from './User';

export class Workout {
    private id?: number;
    private subject: string;
    private date: Date;
    public users: Array<User>;

    static from ({ 
        id,
        subject,
        date,
        users,
    }: WorkoutPrisma & { users: UserPrisma[] }) {
        return new Workout({
            id,
            subject,
            date,
            users: users.map((user) => User.from({
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
                profile: (user as any).profile,
                stats: []
            }))
        });
    } 

    constructor(workout: { id?: number; subject: string; date: Date; users: Array<User>}) {
        this.validate(workout);


        this.id = workout.id;
        this.subject = workout.subject;
        this.date = workout.date;
        this.users = workout.users;
    }

    validate(workout: { subject: string; date: Date; users: Array<User> }) {
        if (!workout.subject) {
            throw new Error('Subject is required')
        }

        if (!workout.date) {
            throw new Error('Date is required')
        }

        
        if (workout.users === undefined || workout.users === null || workout.users.length == 0) {
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

    getUsers(): Array<User> {
        return this.users;
    }

    equals(workout: Workout): boolean {
        return (
            this.subject === workout.getSubject() &&
            this.date === workout.getDate() &&
            this.users === workout.getUsers()
        );
    }
}