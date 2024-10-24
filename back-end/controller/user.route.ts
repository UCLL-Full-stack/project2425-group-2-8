/**
 * @swagger
 *   components:
 *    schemas:
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
 *            stats:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Stats'
 *            workout:
 *              type: array
 *              items: 
 *                  $ref: '#/components/schemas/Workout'
 *      UserInput:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            profile:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *            workouts: 
 *              type: array
 *              properties: 
 *                  id:
 *                      type: number
 *                      format: int64
 */
import express, {Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '../model/User';

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *      post: 
 *          summary: Register a new user
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/UserInput'
 *          responses: 
 *              200: 
 *                  description: Message to let the front end know that the user is succesfully created.
 *                  content: "User is succesfully registered."
 */

userRouter.post('/', (err: Error, req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = userService.registerUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: err.message });
    }
});

export { userRouter };