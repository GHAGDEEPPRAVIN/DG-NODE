import nodemailer from "nodemailer"
import { OtpCollection } from "../models/authenticationModels/otpModel.js"
import { EMAIL,EMAIL_PASS } from "../env/globals.js";

// transporter for nodemailer that indicate the email and password form this both the email is send an otp
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        // email that send draft the email to the signing in email
        user:EMAIL,
        pass:EMAIL_PASS
    }
})    

// generate an random 6 digit otp 
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

// otpSender send otp on the email which is signing in to the website
export const otpSender = async (email) => {
    // otp which will be send to the email
    const otp = generateOtp()

    // set expiry to the current time + 2 min
    const expiryAt = new Date(Date.now() + Number(120000));
    try {
        // update existing OTP or create new one if it doesn't exist
        await OtpCollection.findOneAndUpdate(
            { email },
            { otp, expiryAt },
            { upsert: true, new: true }
        );

        // send the format for data to the email
        await transporter.sendMail({
            from: `Flipkart <${EMAIL}>`,
            to: email,
            subject: "Flipkart Authentication",
            text: `Your otp to signin Flipkart is ${otp}, valid upto 2 minutes`
        });
        return { status: true, message: "OTP Sent successfully !" };
    } catch (err) {
        // returns the error occurs in try block
        return { status: false, message: err.message };
    }
}
