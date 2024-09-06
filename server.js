import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
import mongoose from 'mongoose';
import { setupMiddlewares } from './bootstrap/middleware.js';
import { setupRoutes } from './bootstrap/routes.js';
import connectDB from './bootstrap/db.js';
import { logEvent } from './middleware/logger.js';
const app = express();
setupMiddlewares(app);
setupRoutes(app); // routes are here now
app.all('*', (req, res) => {
    res.status(404).send('404 Not Found');
});
app.use(errorHandler);
connectDB();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
mongoose.connection.on('error', (err) => {
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
    console.log(err);
});
