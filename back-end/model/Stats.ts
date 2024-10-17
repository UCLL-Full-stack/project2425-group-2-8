

export class Stats {
    private id? : number;
    private weight : number;
    private lenght : number;
    private pr: number
    private date : Date;

    constructor(stats: {
        id?: number;
        weight: number;
        lenght: number;
        pr: number;
        date: Date;
    }) {
        this.id = stats.id;
        this.weight = stats.weight;
        this.lenght = stats.lenght;
        this.pr = stats.pr;
        this.date = stats.date;
    }

    getId(): number | undefined {
        return this.id;
    }

    getWeight(): number {
        return this.weight;
    }

    getLenght(): number {
        return this.weight;
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
            this.lenght === stats.getLenght() &&
            this.pr === stats.getPr() &&
            this.date === stats.getDate()
        );
    }
}