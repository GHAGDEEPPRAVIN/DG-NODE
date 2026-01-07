import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async() => 
{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDb Connected Successfully...")
    } catch (error) {
        console.log("MongoDb Connection Failed !")
    }
}