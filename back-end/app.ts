import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.route';
import { statsRouter } from './controller/stats.route';
import { workoutRouter } from './controller/workout.route';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256']
    }).unless({
        path: ['/apid/doxs', /^\/apid-docs\/.*/, '/users/login', '/users/signup', '/status'],
    })
)

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FitFait',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.route.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

app.use('/user', userRouter);
app.use('/stats', statsRouter);
app.use('/workout', workoutRouter);