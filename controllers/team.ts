import Team from '../models/Team.js'
import User from '../models/User.js'
import { Request } from 'express'


import { RequestHandler } from 'express'
import { TeamLeaveSchemaType } from '../schemas/teamSchemas.js'
import mongoose from 'mongoose'

const getTeamMembers: RequestHandler = async (req, res) => {
    const { teamId } = req.body;

    try {

        const team = await Team.findById(teamId).populate('members');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json({
            members: team.members
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createTeam: RequestHandler = async (req, res) => {
    const { name } = req.body


    const team = await Team.create({
        name,
        owner: req.userId
    })

    res.json({
        team
    })
}

const deleteTeam: RequestHandler = async (req, res) => {
    const { teamId } = req.body

    const team = await Team.findOneAndDelete({ _id: teamId, owner: req.userId })

    if (!team) {
        return res.status(404).json({ message: 'Team not found' })
    }

    res.json({
        team
    })
}

const updateTeamName: RequestHandler = async (req, res) => {
    const { teamId, newName } = req.body

    const team = await Team.findOneAndUpdate(
        { _id: teamId, owner: req.userId },
        { name: newName },
        { new: true }
    )

    if (!team) {
        return res.status(404).json({ message: 'Team not found' })
    }

    res.json({ team })
}

const inviteUser: RequestHandler = async (req, res) => {
    const { teamId, username, role } = req.body



    const user = await User.findOne({ username })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    if (user.id == req.userId) {
        return res.status(400).json({ message: 'You cannot invite yourself' })
    }

    const team = await Team.findOne({ _id: teamId, owner: req.userId })
    if (!team) {
        return res.status(404).json({ message: 'Team not found' })
    }

    // check if user is already in team
    const isMember = team.members.find(member => member.user?.toString() === (user._id as string).toString())


    if (isMember) {
        return res.status(400).json({ message: `User ${user.username} is already in ${team.name}` })
    }

    // console.log(user._id);

    team.members.push({ user: user._id, role })
    await team.save();


    res.json({ Message: `User ${user.username} added to ${team.name} ` })
}

const removeUser: RequestHandler = async (req, res) => {
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

const leaveTeam: RequestHandler = async (req: Request<{}, {}, TeamLeaveSchemaType>, res) => {
    const { teamId } = req.body;

    const team = await Team.findOne({
        _id: teamId,
        'members.user': req.userId
    }).exec();

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    // remove the user from the team
    const result = await Team.findByIdAndUpdate(
        teamId,
        {
            $pull: {
                members: {
                    user: req.userId
                }
            }
        },
        { new: true }
    )

    res.json(result);
}

const getAllTeams: RequestHandler = async (req, res) => {
    // get teams where the user is a member, fieled id only
    const memberTeams = await Team.find({
        'members.user': req.userId,
        'members.accepted': true
    }).select('name');


    const ownerTeams = await Team.find({
        owner: req.userId
    }).select('name');

    res.json({
        memberTeams,
        ownerTeams
    })
}

const getTeamRole: RequestHandler = async (req, res) => {
    const { teamId } = req.body;

    try {
        const team = await Team.findById(teamId).populate('members');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        if (team.owner.toString() === req.userId) {
            return res.json({ role: 'owner' });
        }

        const member = team.members.find(member => member.user?.toString() === req?.userId);

        if (!member) {
            return res.status(404).json({ message: 'User not found in team' });
        }

        res.json({
            role: member.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export {
    createTeam,
    deleteTeam,
    updateTeamName,
    inviteUser,
    removeUser,
    leaveTeam,
    getAllTeams,
    getTeamMembers,
    getTeamRole
}