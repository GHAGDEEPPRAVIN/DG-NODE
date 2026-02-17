import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import { PORT } from "./utiles/globals.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/classroom", classroomRoutes); 

connectDB();

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
