import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/movies");
        console.log("MongoDB Connected Successfully...");
    } catch (error) {
        console.log("MongoDB Connection Failed:", error);
    }
};

export default connectDb;
