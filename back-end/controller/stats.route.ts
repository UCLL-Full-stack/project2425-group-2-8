
/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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
 *              userId: 
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
 *          security:
 *              - bearerAuth: []
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

statsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const stats = <StatsInput>req.body;
        const result = await statsService.addStats(stats);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /stats/{id}:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          summary: Get all stats of a user over time
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                type: number
 *              description: The ID of the user whose stats you want to see
 *          responses:
 *              200:
 *                  description: An array of all stats for the specified user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Stats'
 */



statsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const allStats = await statsService.getStatsByUserId(userId);
        res.status(200).json(allStats);
    } catch(error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});


export { statsRouter };