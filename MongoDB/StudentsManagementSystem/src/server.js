import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import studentRouter from "./routes/book_Routes.js";

const app = express();
const port = 1441;
app.use(cors());
app.use(express.json());

connectDB();

app.use("/", studentRouter);

app.listen(port, () => console.log("Server running on localhost:",port));