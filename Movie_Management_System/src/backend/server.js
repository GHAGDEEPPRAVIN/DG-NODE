import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import movieRoutes from "./routes/movie_Routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/movies", movieRoutes);

connectDb();

app.listen(1234, () => {
    console.log("Server running on port 1234");
});
