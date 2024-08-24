import jwt from 'jsonwebtoken';
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    req.userId = decoded.UserInfo.userId;
    next();
};
export default verifyJWT;
