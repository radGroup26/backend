import userModel from '../models/User.js';
import orderModel from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import Team from '../models/Team.js';
import bcrypt from 'bcrypt';
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find().select('-password').lean();
    if (!users?.length) {
        res.status(400).json({ message: 'No users found' });
    }
    res.json(users);
});
const createNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await userModel.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        "password": hashedPwd,
    });
    const team = await Team.create({
        name: 'Default Restaurant',
        owner: user.id
    });
    if (user) {
        res.status(201).json({ message: `New user ${username} created` });
    }
    else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
};
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body;
    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        res.status(400).json({ message: 'All fields except password are required' });
    }
    // Does the user exist to update?
    const user = await userModel.findById(id).exec();
    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
    }
    // Check for duplicate 
    const duplicate = await userModel.findOne({ username }).lean().exec();
    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        res.status(409).json({ message: 'Duplicate username' });
    }
    user.username = username;
    user.active = active;
    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10); // salt rounds 
    }
    const updatedUser = await user.save();
    res.json({ message: `${updatedUser.username} updated` });
});
const deleteUser = async (req, res) => {
    const { id } = req.body;
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' });
    }
    // Does the user still have assigned orders?
    const note = await orderModel.findOne({ user: id }).lean().exec();
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' });
    }
    // Does the user exist to delete?
    const user = await userModel.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    await user.deleteOne();
    const reply = `Username ${user.username} with ID ${user._id} deleted`;
    res.json(reply);
};
export { getAllUsers, createNewUser, updateUser, deleteUser };
