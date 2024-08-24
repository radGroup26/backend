import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url'
import { dirname } from "../lib/helper.js";
import { createTeam, deleteTeam, updateTeamName, inviteUser, removeUser } from '../controllers/team.js'
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.route('/')
    .post(createTeam)
    .delete(deleteTeam)

router.route('/name')
    .put(updateTeamName)

router.route('/invite')
    .post(inviteUser)

router.route('/member')
    .delete(removeUser)


export default router