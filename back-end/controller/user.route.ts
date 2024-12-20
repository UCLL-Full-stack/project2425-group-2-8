/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            email:
 *              type: string
 *              description: email user.
 *            fullname:
 *             type: string
 *             description: Full name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: Email user.
 *            password:
 *              type: string
 *              description: User password.
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
 *      ProfileInput:
 *          type: object
 *          properties:
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
 *      UserInput:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            profile:
 *              $ref: '#/components/schemas/ProfileInput'
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { User } from '../model/User';
import { RequestBody } from 'swagger-jsdoc';
import { error } from 'console';

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *      post:
 *          security:
 *              - bearerAuth: []
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
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /user:
 *      get:
 *          summary: Get a list of all users
 *          responses:
 *              200:
 *                  description: A list of all users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /user/{id}:
 *      get:
 *          summary: Get a user by ID
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: integer
 *                description: The ID of the user to retrieve
 *          responses:
 *              200:
 *                  description: The user object, with his latest stats
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *
 */

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userService.getUserById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: (error as Error).message });
    }
});

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/UserInput'
 *
 *     responses:
 *       200:
 *         description: The created user object.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 */

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserInput = <UserInput>req.body;
        const user = await userService.registerUser(UserInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login using email/password. Returns an object with JWT token and user name when successful.
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: The created user object.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/email/{email}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get a user with the given email
 *      parameters:
 *        - name: email
 *          in: path
 *          required: true
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: The user object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
