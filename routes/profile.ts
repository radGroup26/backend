import express from 'express';
import { getProfile, createNewProfile, updateProfile, deleteProfile } from '../controllers/profile.js';

const router = express.Router();

router.get('/:userId', getProfile);
router.post('/create', createNewProfile);
router.post('/update', updateProfile);
router.post('/delete', deleteProfile);

export default router;