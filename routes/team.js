import express from "express";
import { createTeam, deleteTeam, updateTeamName, inviteUser, removeUser, leaveTeam, getAllTeams, getTeamMembers, getTeamRole } from '../controllers/team.js';
import inviteRouter from './invite.js';
const router = express.Router();
router.route('/')
    .get(getAllTeams)
    .post(createTeam)
    .delete(deleteTeam);
router.put('/name', updateTeamName);
router.post('/invite', inviteUser);
router.delete('/member', removeUser);
router.post('/leave', leaveTeam);
router.use('/invites', inviteRouter);
router.post('/members', getTeamMembers);
router.post('/role', getTeamRole);
export default router;
