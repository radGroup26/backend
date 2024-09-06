import router from '../routes/root.js';
import userRouter from '../routes/user.js';
import authRouter from '../routes/auth.js';
import verifyJWT from '../middleware/verifyJWT.js';
import teamRouter from '../routes/team.js';
import tableRouter from '../routes/table.js';
import itemRouter from '../routes/item.js';
import orderRouter from '../routes/order.js';
import inviteRouter from '../routes/invite.js';
import type { Express } from 'express';

export const setupRoutes = (app: Express) => {
    app.use('/test', verifyJWT, (req, res) => {
        res.send(req.user);
    });

    app.use('/', router);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/teams', verifyJWT, teamRouter);
    app.use('/tables', verifyJWT, tableRouter);
    app.use('/items', verifyJWT, itemRouter);
    app.use('/orders', verifyJWT, orderRouter);
};