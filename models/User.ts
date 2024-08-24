import { Schema, Document, model } from 'mongoose'

interface IUser extends Document {
    username: string
    password: string
    active: boolean
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
})


export default model<IUser>('User', userSchema)
export type { IUser }