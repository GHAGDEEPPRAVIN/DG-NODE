import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);

app.listen(1211, () => console.log("Server running on port 1211"));
