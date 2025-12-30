import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true               // allow cookies
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.use("/api/blog", blogRoutes);

connectDB();

app.listen(1000, () => {
  console.log("Server running on port 1000");
});
