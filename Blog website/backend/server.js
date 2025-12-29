import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/blog", blogRoutes);

connectDB();

app.listen(1000, () => {
  console.log("Server running on port 1000");
});
