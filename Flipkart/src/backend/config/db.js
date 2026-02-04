import mongoose from "mongoose";
import {MONGODB_URL} from "../env/globals.js"

// connectDB for MongoDb Database connection  
export const connectDB = async () => {
    try {
        // process for database connection...
        await mongoose.connect(MONGODB_URL)
        console.log("MongoDb Connected Successfully...")
    } catch (error) {
        // console.log("MongoDb connection Failed !")  
        console.log(error.message);
    }
}