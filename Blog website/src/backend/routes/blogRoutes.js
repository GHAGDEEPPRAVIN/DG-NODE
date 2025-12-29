import express from "express";
import upload from "../config/multer.js";

import {
    addBlog,
    getBlog,
    updateBlog,
    deleteBlog
} from "../controllers/blogControllers.js";
import { signIn, signUp } from "../controllers/blogControllers.js";
import { checkAuth } from "../middleware/blogMiddleware.js";

const router = express.Router();

// routes for Authentication starts...

router.post("/login/signup",signUp)
router.post("/login/signin",signIn)

// routes for Authentication end !!!

// -------------------------------------------------------------------------------------------------------------------------------

// routes for Blog CRUD starts...

router.post("/add", upload.single("image_path"),checkAuth, addBlog);
router.get("/",checkAuth, getBlog);
router.put("/update/:id", upload.single("image_path"), updateBlog);
router.delete("/delete/:id", deleteBlog);

// routes for Blog CRUD ends !!!


export default router;
