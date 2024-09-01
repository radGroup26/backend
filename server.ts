import express from 'express'
import router from './routes/root.js'
import { logger } from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { options } from './config/cors.js'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/dbConn.js'
import mongoose from 'mongoose'
import { logEvent } from './middleware/logger.js'
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
import verifyJWT from './middleware/verifyJWT.js'
import teamRouter from './routes/team.js'
import swaggerDocs from './config/swagger.js'
import inviteRouter from './routes/invite.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

//
// app.use(cors(options));


app.use(logger)


app.use('/test', verifyJWT, (req, res) => {
    res.send(req.user)
})

app.use('/', router)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.use('/teams', verifyJWT, teamRouter)
app.use('/invites', verifyJWT, inviteRouter)

swaggerDocs(app, 3000)


app.all('*', (req, res) => {
    res.status(404).send('404 Not Found')
})
app.use(errorHandler)


connectDB()
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    const PORT = Number(process.env.PORT) || 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})

mongoose.connection.on('error', (err) => {
    logEvent(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
    console.log(err);
})