import Profile from "../models/Profile.js";

import { RequestHandler } from "express";

const getProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.find({ userId: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const createNewProfile: RequestHandler = async (req, res) => {
  const { first_name, last_name, role, email, userId } = req.body;
    try {
      const profile = await Profile.create({
        first_name,
        last_name,
        email,
        role,
        userId,
      });

      res.json({
        profile,ProfileStatus : true
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating profile", error });
    }
};

const updateProfile: RequestHandler = async (req, res) => {
  const { first_name, last_name, role, email, userId } = req.body;
  
  try {
    const profile = await Profile.findByIdAndUpdate(
      userId,
      {
        $set: {
          first_name,
          last_name,
          email,
          role,
          ProfileStatus: true // Set ProfileStatus to true
        },
        $exists: { fields: { ProfileStatus: true } }
      },
      { new: true }
    );

    if (!profile || !profile.ProfileStatus) {
      return res.status(400).json({ message: "Profile not found or ProfileStatus is false" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: "Error editing profile", error });
  }
};

const deleteProfile: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  try {
    const profile = await Profile.findByIdAndDelete(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

export { getProfile, createNewProfile, updateProfile, deleteProfile };
