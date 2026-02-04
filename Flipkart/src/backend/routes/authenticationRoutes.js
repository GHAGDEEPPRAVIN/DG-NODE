import express from "express";
import { signUpUser } from "../controllers/authenticationControllers/authenticationControllersForUser.js";
import { signUpSellers } from "../controllers/authenticationControllers/authenticationControllersForSeller.js";
import { signInForUserAndSeller, verifyOtpForUserAndSeller } from "../controllers/authenticationControllers/authenticationControllersforbothUser&Seller.js";

// =============================== routes for user authentication ===============================
const authenticationRoutesForUser = express.Router()

// routes for sign up user 
authenticationRoutesForUser.post("/signup", signUpUser)

// ------------------------------- exporting the route of user for server.js -------------------------------
export default authenticationRoutesForUser;

// =============================== routes for seller authentication ===============================

// ------------------------------- exporting the route of seller for server.js -------------------------------
export const authenticationRoutesForSeller = express.Router()

// routes for sign up seller 
authenticationRoutesForSeller.post("/signup", signUpSellers)

// =============================== routes for universal sign in authentication ===============================

export const authenticationRoutesForUserAndSeller = express.Router()

// routes for sign for all user , seller and admin
authenticationRoutesForUserAndSeller.post("/signin", signInForUserAndSeller)
// routes for verify otp for all user , seller and admin
authenticationRoutesForUserAndSeller.post("/verifyOtp", verifyOtpForUserAndSeller)