import express from "express";
import { login, refresh, logout } from '../controllers/auth.js';
import rateLimiter from "../middleware/rateLimiter.js";
const router = express.Router();
router.route('/')
    .post(rateLimiter, login);
router.route('/refresh')
    .get(refresh);
router.route('/logout')
    .post(logout);
export default router;
