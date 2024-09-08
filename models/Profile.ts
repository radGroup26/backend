import mongoose, { Schema, Document, model } from 'mongoose'

interface IProfile extends Document {
    first_name: string
    last_name: string
    role: string
    email: string
    userId: mongoose.Schema.Types.ObjectId
    ProfileStatus: boolean
}

const ProfileSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ProfileStatus : {
        type : Boolean,
        default : false
    }
})


export default model<IProfile>('Profile', ProfileSchema)
export type { IProfile }