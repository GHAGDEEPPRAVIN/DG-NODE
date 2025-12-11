import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/bookstore");
        console.log("MongoDb Connected Succeefully...")
    } catch (error) {
        console.log("MongoDb Connection Failed !")
    }
}

export default connectDB;