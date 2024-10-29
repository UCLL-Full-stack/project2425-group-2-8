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
 *      UserInput:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
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
 *                  description: The created user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                            
 */

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.registerUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: (error as Error).message });
    }
});

export { userRouter };