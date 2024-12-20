import { User as UserPrisma, Stats as StatsPrisma } from '@prisma/client';
import { User } from './User';
const now = new Date();

export class Stats {
    private id? : number;
    private weight : number;
    private length : number;
    private pr: number
    private date: Date;
    public userId: number;

    static from ({ 
        id,
        weight,
        length,
        pr,
        userId,
    }: StatsPrisma & {}): Stats {
        return new Stats({
            id,
            weight,
            length,
            pr,
            userId
        });
    } 

    constructor(stats: { id?: number; weight: number; length: number; pr: number; userId: number }) {
        this.validate(stats);

        this.id = stats.id;
        this.weight = stats.weight;
        this.length = stats.length;
        this.pr = stats.pr;
        this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.userId = stats.userId;
    }   

    validate(stats: { weight: number; length: number; pr: number; userId: number }) {
        if (!stats.weight) {
            throw new Error('Weigth is required!')
        }

        if(!stats.length) {
            throw new Error('Length is required!')
        }

        if (!stats.pr) {
            throw new Error('Pr is required!')
        }

        if(stats.userId === undefined || stats.userId === null) {
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

    getUserId(): number {
        return this.userId;
    }

    equals(stats: Stats): boolean {
        return (
            this.weight === stats.getWeight() &&
            this.length === stats.getLength() &&
            this.pr === stats.getPr() &&
            this.date === stats.getDate() &&
            this.userId === stats.getUserId()
        );
    }
}