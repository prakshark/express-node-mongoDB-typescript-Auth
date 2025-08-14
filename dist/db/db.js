import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;
export async function connectDB() {
    if (!uri) {
        console.log(`Error in connecting to mongodb`);
        process.exit(1);
    }
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB`);
}
