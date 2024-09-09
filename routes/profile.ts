import express from 'express';
import { getProfile, createNewProfile, updateProfile, deleteProfile } from '../controllers/profile.js';

const router = express.Router();

router.get('/:userId', getProfile);
router.post('/create', createNewProfile);
router.post('/update/:userId', updateProfile);
router.post('/delete/:userId', deleteProfile);

export default router;