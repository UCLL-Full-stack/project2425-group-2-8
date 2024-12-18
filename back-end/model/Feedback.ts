import { Feedback as FeedbackPrisma } from '@prisma/client';

const now = new Date();

export class Feedback {
    private id?: number;
    private name: string;
    private email: string;
    private message: string;
    private createdAt: Date;

    static from({
        id,
        name,
        email,
        message,
        createdAt,
    }: FeedbackPrisma): Feedback {
        return new Feedback({
            id,
            name,
            email,
            message,
            createdAt,
        });
    }

    constructor({
        id,
        name,
        email,
        message,
        createdAt,
    }: {
        id?: number;
        name: string;
        email: string;
        message: string;
        createdAt?: Date;
    }) {
        this.validate({ name, email, message });

        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = createdAt || new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    validate({ name, email, message }: { name: string; email: string; message: string }) {
        if (!name) {
            throw new Error('Name is required!');
        }

        if (!email) {
            throw new Error('Email is required!');
        }

        if (!message) {
            throw new Error('Message is required!');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getMessage(): string {
        return this.message;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }
    
    equals(feedback: Feedback): boolean {
        return (
            this.name === feedback.getName() &&
            this.email === feedback.getEmail() &&
            this.message === feedback.getMessage() &&
            this.createdAt.getTime() === feedback.getCreatedAt().getTime() 
        );
    }
}
