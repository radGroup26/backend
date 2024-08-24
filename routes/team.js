import express from "express";
import { createTeam } from '../controllers/team.js';
const router = express.Router();
router.route('/').post(createTeam);
export default router;
