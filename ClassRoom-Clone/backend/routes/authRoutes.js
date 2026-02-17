import express from "express";
import { AddclassroomKeys, changePassword, forgetPassword, signIn, signUp, verifyOtp, verifyOtpForForgetPassword } from "../controllers/authenticationControllers.js";
import { validateSigninPage, validateSignupPage } from "../middleware/authenticationMiddleware.js";

const authRouter = express.Router()

authRouter.post("/",validateSigninPage,signIn)
authRouter.put("/addJoiningKey",AddclassroomKeys)
authRouter.post("/signup",validateSignupPage,signUp)
authRouter.post("/verifyOtp",verifyOtp)
authRouter.post("/forgetPassword",forgetPassword)
authRouter.post("/changePassword",changePassword)
authRouter.post("/forgetPasswordOtp",verifyOtpForForgetPassword)

export default authRouter;