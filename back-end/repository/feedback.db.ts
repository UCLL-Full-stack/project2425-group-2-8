import { Feedback } from "../model/Feedback";
import database from "./database";

const addFeedback = async (feedback: Feedback): Promise<Feedback> => {
    try {
        const createdFeedback = await database.feedback.create({
            data: {
                name: feedback.getName(),
                email: feedback.getEmail(),
                message: feedback.getMessage()
            }
        });

        return Feedback.from(createdFeedback);
    } catch (error) {
        console.error('Error during feedback creation:', error);
        throw new Error('Database error. See server log for details');
    }
};

const getFeedback = async (): Promise<Feedback[]> => {
    try {
        const feedbackPrisma = await database.feedback.findMany({
            orderBy: {
                createdAt: 'desc' 
            }
        });

        return feedbackPrisma.map(feedback => Feedback.from(feedback));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details');
    }
};

export default {
    addFeedback,
    getFeedback
}