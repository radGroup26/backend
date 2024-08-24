import Team from '../models/Team.js';
import User from '../models/User.js';
const createTeam = async (req, res) => {
    const { name } = req.body;
    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.status(500).json({ message: 'Server error. Database or jwt middleware' });
    }
    const team = await Team.create({
        name,
        owner: user._id
    });
    res.json({
        team
    });
};
export { createTeam };
