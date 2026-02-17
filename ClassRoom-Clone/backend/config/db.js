import mongoose from "mongoose";
import { MongoDB_URL } from "../utiles/globals.js";

// connectDB for MongoDb Database connection  
export const connectDB = async () => {
    try {
        // process for database connection...
        await mongoose.connect(MongoDB_URL)
        console.log("MongoDb Connected Successfully...")
    } catch (error) {
        // console.log("MongoDb connection Failed !")  
        console.log(error.message);
    }
}