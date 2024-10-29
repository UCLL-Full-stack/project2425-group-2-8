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
 *            weigth:
 *              type: number
 *              format: int64
 *            length:
 *              type: number
 *              format: int64
 *            pr:
 *              type: number
 *              format: int64
 *            dateOfBirth: 
 *              type: string
 *              format: date-time
 */
import express, {Request, Response } from 'express';
import statsService from '../service/stats.service';
import { StatsInput } from '../types';

const statsRouter = express.Router();

statsRouter.post('/', (err: Error, req: Request, res: Response) => {
    console.log("debug");
    try {
        const stats = <StatsInput>req.body;
        const result = statsService.addStats(stats);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: err.message });
    }
});

export { statsRouter };