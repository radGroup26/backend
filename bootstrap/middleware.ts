import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { logger } from '../middleware/logger.js';

export const setupMiddlewares = (app: Express) => {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(logger);
};