import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        role: {
            type: String,
            required: true,
            default: 'waiter',
        },
        accepted: {
            type: Boolean,
            required: true,
            default: false,
        }
    }],
})

export default mongoose.model('Team', teamSchema)