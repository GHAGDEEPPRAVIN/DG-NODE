import mongoose from "mongoose";

export const connectDB = async() =>
{
    try {
        await mongoose.connect("mongodb://localhost:27017/blog")
        console.log("MongoDb Connected Succeefully...")
    } catch (error) {
        console.log("MongoDb Connection Failed !!!")
    }
}
