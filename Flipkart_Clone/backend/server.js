import dotenv  from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express()
app.use(express.json());

// Started MongoDb Atlas Database
connectDB();

// authentication routes 
app.use("/api/auth",authRoutes);
// product routes
app.use("/api/product",productRouter)

// Started Server
app.listen(process.env.PORT,()=>{
    console.log("Server Started Successfully...")
});