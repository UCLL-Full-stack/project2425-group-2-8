

export class Workout {
    private id? : number;
    private subject : string;
    private date : Date;

    constructor(workout: {
        id?: number;
        subject: string;
        date: Date;
    }) {
        this.id = workout.id;
        this.subject = workout.subject;
        this.date = workout.date;
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

    equals(workout: Workout): boolean {
        return (
            this.subject === workout.getSubject() &&
            this.date === workout.getDate()
        );
    }
}