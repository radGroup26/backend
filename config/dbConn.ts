import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URI!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}