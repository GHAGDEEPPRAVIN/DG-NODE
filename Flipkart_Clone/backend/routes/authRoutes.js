import express from "express";
import {signIn,signUp,verifyOtp} from "./../controllers/authController.js"

const authRoutes = express.Router();

authRoutes.post("/",signIn);
authRoutes.post("/signup",signUp);
authRoutes.post("/VerifyOtp",verifyOtp);

export default authRoutes;