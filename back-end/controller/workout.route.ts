
/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Profile:
 *          type: object
 *          properties: 
 *            id:
 *              type: number
 *              format: int64
 *            firstName:
 *              type: string
 *            name:
 *              type: string
 *            dateOfBirth:
 *              type: string
 *              format: date-time
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            profile:
 *              $ref: '#/components/schemas/Profile'
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
 *              users: 
 *                  type: array
 *                  items: 
 *                      $ref: '#/components/schemas/User'
 *      WorkoutInput:
 *          type: object
 *          properties:
 *              subject:
 *                  type: string
 *              date:
 *                  type: string
 *                  format: date-time
 *              userIds:
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
 *          summary: Add a new workout containing one or more users
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
 *                          schema:
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
 *          summary: Get all workouts where a given user participates
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


/**
 * @swagger
 * /workout/{id}:
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          summary: Delete a workout from the given id
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: number
 *              description: The ID of the workout that has to be deleted
 *          responses:
 *              200:
 *                  description: A success message saying that the workout has been correctly deleted
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              type: string
 */
workoutRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const workoutId = parseInt(req.params.id);
        const message = await workoutService.deleteWorkoutById(workoutId);
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message})
    }
})

export { workoutRouter };

