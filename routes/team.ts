import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url'
import { dirname } from "../lib/helper.js";
import { createTeam } from '../controllers/team.js'
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.route('/').post(createTeam)


export default router