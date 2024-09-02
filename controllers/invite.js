import Team from "../models/Team.js";
const getAllInvites = async (req, res) => {
    console.log('Get all invites');
    const teams = await Team.find({
        'members.user': req.userId,
        'members.accepted': false
    }).exec();
    // if (!teams.length) {
    //     return res.status(400).json({ message: 'No invites found' })
    // }
    const invitedTeams = teams.map(team => ({
        name: team.name,
        id: team._id,
        owner: team.owner
    }));
    res.json({
        'teams': invitedTeams
    });
};
const acceptInvite = async (req, res) => {
    const { teamId } = req.body;
    const team = await Team.findOne({
        _id: teamId,
        'members.user': req.userId,
        'members.accepted': false
    }).exec();
    if (!team) {
        return res.status(400).json({ message: 'Invite not found' });
    }
    //uppdate the team
    team.members.map(member => {
        if (member.user && member.user.toString() === req.userId) {
            member.accepted = true;
        }
    });
    await team.save();
    res.json(team);
};
export { getAllInvites, acceptInvite };
