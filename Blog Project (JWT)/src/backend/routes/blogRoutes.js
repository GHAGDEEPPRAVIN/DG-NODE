import express from "express";
import upload from "../config/multer.js";
import { verifyToken } from "../middleware/blogMiddleware.js";
import {
  signUp,
  signIn,
  verifyOtp,
  home,
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blogControllers.js";

const router = express.Router();

// Auth
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify-otp", verifyOtp);

// Protected
router.get("/home", verifyToken, home);
router.post("/", verifyToken, upload.single("image_path"), addBlog);
router.get("/", verifyToken, getBlog);
router.put("/update/:id", verifyToken, upload.single("image_path"), updateBlog);
router.delete("/delete/:id", verifyToken, deleteBlog);

export default router;
