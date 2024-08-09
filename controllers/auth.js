import userModel from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    const foundUser = await userModel.findOne({ username }).exec();
    if (!foundUser || !foundUser.active) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match)
        res.status(401).json({ message: 'Unauthorized' });
    const accessToken = jwt.sign({
        "UserInfo": {
            "username": foundUser.username,
            "roles": foundUser.roles
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ "username": foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: false, //https
        sameSite: 'strict', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    });
    // Send accessToken containing username and roles 
    res.json({ accessToken });
});
const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const refreshToken = cookies.jwt;
    let decoded = { username: '' };
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        if (err) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
    }
    const foundUser = await userModel.findOne({ username: decoded.username }).exec();
    if (!foundUser) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const accessToken = jwt.sign({
        "UserInfo": {
            "username": foundUser.username,
            "roles": foundUser.roles
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
});
const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(204); //No content
        return;
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });
    res.json({ message: 'Cookie cleared' });
});
export { login, refresh, logout };
