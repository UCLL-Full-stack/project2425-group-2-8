import { User } from "./User";


export class Stats {
    private id? : number;
    private weight : number;
    private length : number;
    private pr: number
    private date: Date;
    private user: User;

    constructor(stats: { id?: number; weight: number; length: number; pr: number; date: Date; user: User }) {
        this.validate(stats);


        this.id = stats.id;
        this.weight = stats.weight;
        this.length = stats.length;
        this.pr = stats.pr;
        this.date = stats.date;
        this.user = stats.user;
    }

    validate(stats: { weight: number; length: number; pr: number; date: Date; user: User }) {
        if (!stats.weight) {
            throw new Error('Weigth is required!')
        }

        if(!stats.length) {
            throw new Error('Length is required!')
        }

        if (!stats.pr) {
            throw new Error('Pr is required!')
        }

        if(!stats.date) {
            throw new Error('Date is required')
        }

        if(!stats.user) {
            throw new Error('User is required')
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getWeight(): number {
        return this.weight;
    }

    getLength(): number {
        return this.length;
    }

    getPr(): number {
        return this.pr
    }

    getDate(): Date {
        return this.date;
    }

    getUser(): User {
        return this.user;
    }

    equals(stats: Stats): boolean {
        return (
            this.weight === stats.getWeight() &&
            this.length === stats.getLength() &&
            this.pr === stats.getPr() &&
            this.date === stats.getDate() &&
            this.user === stats.getUser()
        );
    }
}