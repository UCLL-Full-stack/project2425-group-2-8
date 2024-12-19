import { UnauthorizedError } from "express-jwt";
import { Feedback } from "../model/Feedback";
import feedbackDb from "../repository/feedback.db";
import { FeedbackInput } from "../types";


const getFeedback = async ({ role }: { role: string }): Promise<Feedback[]> => {

    if(role === 'admin') {
        return await feedbackDb.getFeedback();
    } else {
        throw new UnauthorizedError('credentials_required', {message: 'You are not authorized to see this resource'});
    }
    
};



const addFeedback = async (feedbackInput: FeedbackInput): Promise<Feedback> => {
    const { name, email, message } = feedbackInput;

    if (!name) {
        throw new Error('Name is required');
    }

    if (!email) {
        throw new Error('Email is required');
    }

    if (!message) {
        throw new Error('Message is required');
    }

    const newFeedback = new Feedback({
        name,
        email,
        message
    });

    const createdFeedback = await feedbackDb.addFeedback(newFeedback);
    return createdFeedback;
};

export default {
    addFeedback,
    getFeedback
}