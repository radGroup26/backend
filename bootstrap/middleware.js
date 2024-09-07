import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { logger } from '../middleware/logger.js';
export const setupMiddlewares = (app) => {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(logger);
};
