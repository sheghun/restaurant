import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import cors from 'cors';
import 'express-async-errors';

import BaseRouter from './routes';
import Logger from './services/Logger';
import mongoose from 'mongoose';
import { runSeed } from './seeder';
import path from 'path';

const app = express();

console.log(process.env.DB_URL);

// Connect to database
(async () => {
    try {
        const options: mongoose.ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            useFindAndModify: false,
        };

        await mongoose.connect(process.env.DB_URL as string, options);
        // Run seeders
        runSeed();
    } catch (error) {
        Logger.err(error, true);
        throw error;
    }
})();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.err(err, true);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: err.message,
    });
});

// Export express instance
export default app;
