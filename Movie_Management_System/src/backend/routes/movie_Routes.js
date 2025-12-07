import express from "express";
import upload from "../config/multer.js";

import {
    addMovie,
    getMovie,
    updateMovie,
    deleteMovie
} from "../controllers/movie_Controllers.js";

const router = express.Router();

router.post("/add", upload.single("poster"), addMovie);
router.get("/", getMovie);
router.put("/update/:id", upload.single("poster"), updateMovie);
router.delete("/delete/:id", deleteMovie);

export default router;
