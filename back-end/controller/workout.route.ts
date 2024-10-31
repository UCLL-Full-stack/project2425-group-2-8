/**
 * @swagger
 *   components:
 *    schemas:
 *      Workout:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  format: int64
 *              subject:
 *                  type: string
 *              date:
 *                  type: string
 *                  format: date-time
 *      WorkoutInput:
 *          type: object
 *          properties:
 *              subject:
 *                  type: string
 *              date:
 *                  type: string
 *                  format: date-time
 *              userId:
 *                  type: number
 *                  format: int64
 */


import express, {Request, Response} from 'express';
import { WorkoutInput } from '../types';
import workoutService from '../service/workout.service';

const workoutRouter = express.Router();

/**
 * @swagger
 * /workout:
 *      post:
 *          summary: Add new workout to a user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/WorkoutInput'
 *          responses:
 *              200:
 *                  description: The new workout of the user
 *                  content:
 *                      application/json:
 *                          schemas:
 *                              $ref: '#components/schemas/Workout'
 */

workoutRouter.post('/', async (req: Request, res: Response) => {
    try {
        const workout = <WorkoutInput>req.body;
        const result = await workoutService.addWorkout(workout);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});

export { workoutRouter };
