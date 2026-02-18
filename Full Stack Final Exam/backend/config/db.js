import mongoose from "mongoose";
import { MONGODB_URL } from "../utiles/globals.js";

export const connectDB = async() => {
try {
    await mongoose.connect(MONGODB_URL)
    console.log("MongoDB Connected Successfully...")
} catch (error) {
    return console.log("MongoDb connection Failed !",error.message)
}
}