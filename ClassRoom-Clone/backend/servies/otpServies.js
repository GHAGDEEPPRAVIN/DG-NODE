import { EMAIL,EMAIL_PASSWORD } from "../utiles/globals.js";

import nodemailer from "nodemailer";
import { OtpCollection } from "../models/otpModel.js";

// transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

// generate random 6 digit otp
const generateOtp = () => { 
    return Math.floor(100000 + Math.random() * 900000);
};

// send OTP to email
export const otpSender = async (email) => {
    const otp = generateOtp();

    const expiryAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    try {
        await OtpCollection.findOneAndUpdate(
            { email },
            { otp, expiryAt },
            { upsert: true, new: true }
        );

        await transporter.sendMail({
            from: `Classroom <${process.env.EMAIL}>`,   // ✅ FIXED HERE
            to: email,
            subject: "Google Classroom Authentication",
            text: `Your OTP to signin Google Classroom is ${otp}, valid for 2 minutes`
        });

        return { status: true, message: "OTP Sent successfully!" };

    } catch (err) {
        return { status: false, message: err.message };
    }
};