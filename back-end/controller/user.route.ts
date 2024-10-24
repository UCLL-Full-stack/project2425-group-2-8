/**
 * @swagger
 *   components:
 *    schemas:
 *      Schedule:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            User:
 *              $ref: '#/components/schemas/User'
 *            Profile:
 *              $ref: '#/components/schemas/Profile'
 *            Stats:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Stats'
 *            Workout:
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

 */
import express, {Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '../model/User';

const userRouter = express.Router();

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