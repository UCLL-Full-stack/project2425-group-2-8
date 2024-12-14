
/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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
 *              userId: 
 *                  type: number
 *                  format: int64
 *      WorkoutInput:
 *          type: object
 *          properties:
 *              subject:
 *                  type: string
 *              date:
 *                  type: string
 *                  format: date-time
 *              userId:
 *                  type: array
 *                  items: 
 *                      type: number
 *                      format: int64
 */


import express, {Request, Response} from 'express';
import { WorkoutInput } from '../types';
import workoutService from '../service/workout.service';

const workoutRouter = express.Router();

/**
 * @swagger
 * /workout:
 *      post:
 *          security:
 *              - bearerAuth: []
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

/**
 * @swagger
 * /workout/{id}:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          summary: Get all workouts added by a user
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                type: number
 *              description: The ID of the user whose workouts you want to see
 *          responses:
 *              200:
 *                  description: An array of all workouts for the specified user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schemas/Workout'
 */
workoutRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const workouts = await workoutService.getWorkoutsByUserId(userId);
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});

export { workoutRouter };

