import express from "express";
import { createTeam, deleteTeam, updateTeamName, inviteUser, removeUser } from '../controllers/team.js';
const router = express.Router();
router.route('/')
    .post(createTeam)
    .delete(deleteTeam);
router.route('/name')
    .put(updateTeamName);
router.route('/invite')
    .post(inviteUser);
router.route('/member')
    .delete(removeUser);
export default router;
