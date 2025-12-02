import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/student");
    console.log("MongoDB DataBase Connected Successfully...");
  } catch (err) {
    console.log("MongoDB DataBase Connection Failed !!", err);
  }
};