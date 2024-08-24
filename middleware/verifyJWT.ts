import { RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface DecodedToken extends JwtPayload {
    UserInfo: {
        username: string
        roles: string[],
        userId: string
    }
}

const verifyJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    let decoded: DecodedToken | string
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken
    } catch (err) {
        console.error(err)
        res.status(403).json({ message: 'Forbidden' })
        return
    }

    req.user = decoded.UserInfo.username
    req.roles = decoded.UserInfo.roles
    req.userId = decoded.UserInfo.userId
    next()
}

export default verifyJWT