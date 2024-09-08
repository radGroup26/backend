import router from '../routes/root.js';
import userRouter from '../routes/user.js';
import authRouter from '../routes/auth.js';
import verifyJWT from '../middleware/verifyJWT.js';
import teamRouter from '../routes/team.js';
import tableRouter from '../routes/table.js';
import itemRouter from '../routes/item.js';
import orderRouter from '../routes/order.js';
import profileRouter from '../routes/profile.js';
// @ts-ignore - it's not a ts file.
import notificationRouter from '../routes/notification.js';
export const setupRoutes = (app) => {
    app.use('/test', verifyJWT, (req, res) => {
        res.send(req.user);
    });
    app.use('/', router);
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/teams', verifyJWT, teamRouter);
    app.use('/restaurants', verifyJWT, tableRouter);
    app.use('/items', verifyJWT, itemRouter);
    app.use('/orders', verifyJWT, orderRouter);
    app.use('/profiles', verifyJWT, profileRouter);
    app.use('/notifications', verifyJWT, notificationRouter);
};
