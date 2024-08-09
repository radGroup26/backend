import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url'
import { dirname } from "../lib/helper.js";
import { login, refresh, logout } from '../controllers/auth.js'
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.route('/')
    .post(rateLimiter, login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)

export default router