

export class Stats {
    private id? : number;
    private weight : number;
    private length : number;
    private pr: number
    private date : Date;

    constructor(stats: {
        id?: number;
        weight: number;
        length: number;
        pr: number;
        date: Date;
    }) {
        this.id = stats.id;
        this.weight = stats.weight;
        this.length = stats.length;
        this.pr = stats.pr;
        this.date = stats.date;
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

    equals(stats: Stats): boolean {
        return (
            this.weight === stats.getWeight() &&
            this.length === stats.getLength() &&
            this.pr === stats.getPr() &&
            this.date === stats.getDate()
        );
    }
}