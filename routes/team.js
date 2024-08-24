import express from "express";
import { createTeam, deleteTeam, updateTeamName, inviteUser, removeUser, leaveTeam, getAllTeams } from '../controllers/team.js';
const router = express.Router();
router.route('/')
    .get(getAllTeams)
    .post(createTeam)
    .delete(deleteTeam);
router.put('/name', updateTeamName);
router.post('/invite', inviteUser);
router.delete('/member', removeUser);
router.post('/leave', leaveTeam);
export default router;
