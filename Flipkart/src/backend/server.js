import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import { PORT } from "./env/globals.js";
import authenticationRoutesForUser, { authenticationRoutesForSeller, authenticationRoutesForUserAndSeller } from "./routes/authenticationRoutes.js"

dotenv.config()

const app = express()

// use json format allow by express
app.use(express.json())
// use for cross origin platform
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true
    }
))

// impliment routes for user authentication
app.use("/api/auth/User", authenticationRoutesForUser)

// impliment routes for user authentication
app.use("/api/auth/Seller", authenticationRoutesForSeller)

app.use("/api/auth/all", authenticationRoutesForUserAndSeller)

// call connectDB function for mongoDB connection
connectDB()

// listen the server on port 
app.listen(PORT, () => {
    console.log("Server Started Successfully...")
})