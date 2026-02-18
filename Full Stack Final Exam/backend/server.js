import cookieParser from "cookie-parser";
import express, { request } from "express";
import authRouter from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import articlesRouter from "./routes/articlesRoutes.js";
import cors from "cors";
import { PORT } from "./utiles/globals.js";

const app = express()

app.use(express.json())
app.use(cookieParser)

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
connectDB()

app.use("/api/auth", authRouter)
app.use("/api/articles", articlesRouter)

app.listen(PORT, () => {
    console.log("Server Started Successfully...")
})
