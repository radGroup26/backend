import Team from '../models/Team.js';
import User from '../models/User.js';
const createTeam = async (req, res) => {
    const { name } = req.body;
    const team = await Team.create({
        name,
        owner: req.userId
    });
    res.json({
        team
    });
};
const deleteTeam = async (req, res) => {
    const { teamId } = req.body;
    const team = await Team.findOneAndDelete({ _id: teamId, owner: req.userId });
    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    res.json({
        team
    });
};
const updateTeamName = async (req, res) => {
    const { teamId, newName } = req.body;
    const team = await Team.findOneAndUpdate({ _id: teamId, owner: req.userId }, { name: newName }, { new: true });
    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ team });
};
const inviteUser = async (req, res) => {
    const { teamId, username, role } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const team = await Team.findOne({ _id: teamId, owner: req.userId });
    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    // check if user is already in team
    const isMember = team.members.find(member => member.user?.toString() === user._id.toString());
    if (isMember) {
        return res.status(400).json({ message: `User ${user.username} is already in ${team.name}` });
    }
    // console.log(user._id);
    team.members.push({ user: user._id, role });
    await team.save();
    res.json({ Message: `User ${user.username} added to ${team.name} ` });
};
const removeUser = async (req, res) => {
    const { teamId, userId } = req.body;
    const team = await Team.findOne({ _id: teamId, owner: req.userId });
    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    // Check if the user is a member of the team
    const memberIndex = team.members.findIndex(member => member.user?.toString() === userId.toString());
    if (memberIndex === -1) {
        return res.status(404).json({ message: 'User not found in the team' });
    }
    // Remove the user from the members array
    team.members.splice(memberIndex, 1);
    await team.save();
    res.json({ message: `User removed from the team successfully` });
};
export { createTeam, deleteTeam, updateTeamName, inviteUser, removeUser };
