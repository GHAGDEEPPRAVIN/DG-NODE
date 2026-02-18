import express from "express";
import { signin, signup } from "../controllers/authControllers.js";
import { validateSigninFields,validateSignupFields } from "../middleware/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/",validateSigninFields,signin)
authRouter.post("/signup",validateSignupFields,signup)

export default authRouter;