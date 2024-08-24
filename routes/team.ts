import express from "express";
import path from "node:path";
import { fileURLToPath } from 'node:url'
import { dirname } from "../lib/helper.js";
import { createTeam, deleteTeam, updateTeamName, inviteUser, removeUser, leaveTeam, getAllTeams } from '../controllers/team.js'
import rateLimiter from "../middleware/rateLimiter.js";
import inviteRouter from './invite.js'
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.route('/')
    .get(getAllTeams)
    .post(createTeam)
    .delete(deleteTeam)

router.put('/name', updateTeamName)

router.post('/invite', inviteUser)

router.delete('/member', removeUser)

router.post('/leave', leaveTeam)

router.use('/invites', inviteRouter)


export default router