import userModel, {IUser} from '../models/User.js'
import orderModel from '../models/Order.js'
import asyncHandler from 'express-async-handler'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import type { UserLoginInput } from '../schemas/userSchemas.js'


import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'

interface DecodedToken extends JwtPayload {
    username: string
}

function generateAccessToken(user: IUser) {
    return jwt.sign(
        {
            "UserInfo": {
                "username": user.username,
                "userId": user._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    )
}

const login: RequestHandler = asyncHandler(async (req: Request<{}, {}, UserLoginInput>, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({ message: 'All fields are required' })
        return
    }

    const foundUser = await userModel.findOne({ username }).exec()

    if (!foundUser || !foundUser.active) {
        res.status(401).json({ message: 'Unauthorized. No user found' })
        return
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) res.status(401).json({ message: 'Unauthorized. Incorrect Password' })

    const accessToken = generateAccessToken(foundUser)

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: process.env.REFRESH_TOKEN_LIFE }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: false, //https
        sameSite: 'strict', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })
})

const refresh: RequestHandler = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    if (!cookies.jwt) {
        res.status(401).json({ message: 'Unauthorized. Refresh token cookie not found.' })
        return
    }

    const refreshToken = cookies.jwt

    let decoded: DecodedToken | string = { username: '' }

    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as DecodedToken
    } catch (err) {
        if (err) {
            res.status(403).json({ message: 'Forbidden. Invalid or expired refresh token.' })
            return
        }
    }

    const foundUser = await userModel.findOne({ username: decoded.username }).exec()

    if (!foundUser) {
        res.status(401).json({ message: 'Unauthorized. User not found.' })
        return
    }

    const accessToken = generateAccessToken(foundUser)

    res.json({ accessToken })
})

const logout: RequestHandler = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        res.sendStatus(204) //No content
        return
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: false })
    res.json({ message: 'Cookie cleared' })
})

export { login, refresh, logout }