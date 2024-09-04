import profileModel from '../models/Profile.js'
import asyncHandler from 'express-async-handler'

import { RequestHandler } from 'express'

const getProfile: RequestHandler = asyncHandler(async (req, res) => {
    const profile = await profileModel.find().select('first_name, last_name, role, email').lean()

    if (!profile?.length) {
        res.status(400).json({ message: 'Profile not found' })
    }

    res.json(profile)
})

const createNewProfile: RequestHandler = async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body

    if (!first_name || !last_name || !role) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const profile = await profileModel.create({
        first_name,
        last_name,
        role,
        email,
        userId: userId
    })

    if (profile) {
        res.status(201).json({ message: `New profile created` })
    } else {
        res.status(400).json({ message: 'Invalid profile data received' })
    }
}

const updateProfile: RequestHandler = asyncHandler(async (req, res) => {
    const { first_name, last_name, role, email, userId } = req.body

    if (!first_name || !last_name || !role) {
        res.status(400).json({ message: 'All fields are required' })
    }

    const profile = await profileModel.findByIdAndUpdate(userId, {
        first_name,
        last_name,
        role,
        email,
        userId
    })

    if (profile) {
        res.status(201).json({ message: `Profile updated` })
    } else {
        res.status(400).json({ message: 'Invalid profile data received' })
    }
})

const deleteProfile: RequestHandler = asyncHandler(async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        res.status(400).json({ message: 'User ID is required' })
    }

    const profile = await profileModel.findByIdAndDelete(userId)

    if (profile) {
        res.status(201).json({ message: `Profile deleted` })
    } else {
        res.status(400).json({ message: 'Invalid profile data received' })
    }
})

export { getProfile, createNewProfile, updateProfile, deleteProfile }