/**
 * @swagger
 *   components:
 *    securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *    schemas:
 *      Feedback:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            message:
 *              type: string
 *            createdAt: 
 *              type: string
 *              format: date-time
 *      FeedbackInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              message:
 *                  type: string
 */

import express, { Request, Response } from 'express';
import feedbackService from '../service/feedback.service';
import { FeedbackInput } from '../types';

declare global {
    namespace Express {
        interface Request {
            auth: {
                role: string;
            };
        }
    }
}

const feedbackRouter = express.Router();

/**
 * @swagger
 * /feedback: 
 *      post:
 *          security:
 *              - bearerAuth: []
 *          summary: Submit new feedback
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#components/schemas/FeedbackInput'
 *          responses: 
 *              200:
 *                  description: The submitted feedback.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Feedback'
 */
feedbackRouter.post('/', async (req: Request, res: Response) => {
    try {
        const feedbackInput = <FeedbackInput>req.body;
        const result = await feedbackService.addFeedback(feedbackInput);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});


/**
 * @swagger
 * /feedback:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          summary: Get all feedback
 *          responses:
 *              200:
 *                  description: An array of all feedback.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Feedback'
 */
feedbackRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allFeedback = await feedbackService.getFeedback({ role: req.auth.role });
        res.status(200).json(allFeedback);
    } catch(error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});

export { feedbackRouter };