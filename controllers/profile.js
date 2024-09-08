import Profile from "../models/Profile.js";
const getProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const profile = await Profile.find({ userId: userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};
const createNewProfile = async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body;
    if (userId != null) {
        try {
            const profile = await Profile.create({
                first_name,
                last_name,
                email,
                role,
                userId,
            });
            res.json({
                profile,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error creating profile", error });
        }
    }
    else {
        console.log("User ID exists");
    }
};
const updateProfile = async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body;
    try {
        const profile = await Profile.findByIdAndUpdate(userId, {
            first_name,
            last_name,
            email,
            role,
        });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ profile });
    }
    catch (error) {
        res.status(500).json({ message: "Error editing profile", error });
    }
};
const deleteProfile = async (req, res) => {
    const { userId } = req.body;
    try {
        const profile = await Profile.findByIdAndDelete(userId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json({
            profile,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting profile", error });
    }
};
export { getProfile, createNewProfile, updateProfile, deleteProfile };
