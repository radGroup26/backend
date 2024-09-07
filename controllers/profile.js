import Profile from '../models/Profile.js';
import asyncHandler from 'express-async-handler';
/* const getProfile: RequestHandler = asyncHandler(async (req, res) => {
    const { userID } = req.params;
    console.log("Recieved user Id", userID);

    const profile = await Profile.findOne({ userId: userID });

    if (!profile) {
        res.status(404).json({ message: 'Profile not found' })
    }

    res.status(200).json(profile)
}) */
const getProfile = async (req, res) => {
    const { userId } = req.params;
    console.log("Recieved user Id", userId);
    try {
        const profile = await Profile.find({ userId: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};
const createNewProfile = async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body;
    if (!first_name || !last_name || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const profile = await Profile.create({
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
    const profile = await Profile.findByIdAndUpdate(userId, {
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
    const profile = await Profile.findByIdAndDelete(userId);
    if (profile) {
        res.status(201).json({ message: `Profile deleted` });
    }
    else {
        res.status(400).json({ message: 'Invalid profile data received' });
    }
});
export { getProfile, createNewProfile, updateProfile, deleteProfile };
