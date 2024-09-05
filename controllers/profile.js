import profileModel from '../models/Profile.js';
import asyncHandler from 'express-async-handler';
const getProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const profile = await profileModel.find({ userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});
const createNewProfile = async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body;
    if (!first_name || !last_name || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const profile = await profileModel.create({
        first_name,
        last_name,
        role,
        email,
        userId: userId
    });
    if (profile) {
        res.status(201).json({ message: `New profile created` });
    }
    else {
        res.status(400).json({ message: 'Invalid profile data received' });
    }
};
const updateProfile = asyncHandler(async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body;
    if (!first_name || !last_name || !role) {
        res.status(400).json({ message: 'All fields are required' });
    }
    const profile = await profileModel.findByIdAndUpdate(userId, {
        first_name,
        last_name,
        role,
        email,
        userId
    });
    if (profile) {
        res.status(201).json({ message: `Profile updated` });
    }
    else {
        res.status(400).json({ message: 'Invalid profile data received' });
    }
});
const deleteProfile = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
    }
    const profile = await profileModel.findByIdAndDelete(userId);
    if (profile) {
        res.status(201).json({ message: `Profile deleted` });
    }
    else {
        res.status(400).json({ message: 'Invalid profile data received' });
    }
});
export { getProfile, createNewProfile, updateProfile, deleteProfile };