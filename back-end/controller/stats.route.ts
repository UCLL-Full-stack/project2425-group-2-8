/**
 * @swagger
 *   components:
 *    schemas:
 *      Stats:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            weight:
 *              type: number
 *              format: int64
 *            length:
 *              type: number
 *              format: int64
 *            pr:
 *              type: number
 *              format: int64
 *            date: 
 *              type: string
 *              format: date-time
 *      StatsInput:
 *          type: object
 *          properties:
 *              weight:
 *                  type: number
 *                  format: int64
 *              length:
 *                  type: number
 *                  format: int64
 *              pr:
 *                  type: number
 *                  format: int64
 *              date:
 *                  type: string
 *                  format: date-time
 *              UserId: 
 *                  type: number
 *                  format: int64
 */
import express, {Request, Response } from 'express';
import statsService from '../service/stats.service';
import { StatsInput } from '../types';

const statsRouter = express.Router();

/**
 * @swagger
 * /stats: 
 *      post:
 *          summary: Add new stats to a user
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#components/schemas/StatsInput'
 *          responses: 
 *              200:
 *                  description: The new stats of the user.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Stats'
 */

statsRouter.post('/', (req: Request, res: Response) => {
    try {
        const stats = <StatsInput>req.body;
        const result = statsService.addStats(stats);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});

export { statsRouter }; 