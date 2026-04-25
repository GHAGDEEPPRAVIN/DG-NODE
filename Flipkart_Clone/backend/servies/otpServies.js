// import nodemailer from "nodemailer";
// import { OTPModel } from "../models/otpModel.js";

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.EMAIL,
//         pass:process.env.EMAIL_PASS
//     }
// })

// const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000);
// };

// export const otpSender = async(email) => {
//     const otp = generateOtp();
//     const expiryAt = new Date(Date.now() + 2 * 60 * 1000);
    
//     try {
//         await OTPModel.findOneAndUpdate(
//             { email },
//             { otp, expiryAt },
//             { upsert: true, new: true }
//         )

//         await transporter.sendMail({
//             from: `Flipkart <${process.env.EMAIL}>`,   
//             to: email,
//             subject: "Flipkart Authentication",
//             text: `Your OTP to signin Flipkart is ${otp}, valid for 2 minutes`
//         })

//         return { status: true, message: "OTP Sent successfully!" };

//     } catch (error) {
//         return { status: false, message: error.message };
//     }
// }




import nodemailer from "nodemailer";
import { OTPModel } from "../models/otpModel.js";

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// 1. Move the transporter logic inside the function or a creator function
export const otpSender = async(email) => {
    const otp = generateOtp();
    const expiryAt = new Date(Date.now() + 2 * 60 * 1000);

    // 2. Define transporter here to ensure it picks up the latest process.env values
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await OTPModel.findOneAndUpdate(
            { email },
            { otp, expiryAt },
            { upsert: true, new: true }
        );

        await transporter.sendMail({
            from: `Flipkart <${process.env.EMAIL}>`, 
            to: email,
            subject: "Flipkart Authentication",
            text: `Your OTP to signin Flipkart is ${otp}, valid for 2 minutes`
        });

        return { status: true, message: "OTP Sent successfully!" };

    } catch (error) {
        // This will now catch specific SMTP errors
        console.error("SMTP Error:", error); 
        return { status: false, message: error.message };
    }
};