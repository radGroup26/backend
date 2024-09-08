import express from "express";
import * as userController from '../controllers/user.js';
const router = express.Router();
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
export default router;
