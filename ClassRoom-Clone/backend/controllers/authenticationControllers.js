import { AdminModel, StudentModel } from "../models/authModel.js";
import { OtpCollection } from "../models/otpModel.js";
import { otpSender } from "../servies/otpServies.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../utiles/globals.js"


// ========================== SIGN UP ==========================

export const signUp = async (req, res) => {
    const { email, name, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        await StudentModel.create({
            email,
            name,
            password: hashedPassword
        });

        return res.json({
            status: true,
            message: "admin Sign-Up successfully..."
        });

    } catch (error) {
        res.json({
            status: false,
            message: "Failed to Sign-up Student!",
            error: error.message
        });
    }
};



// ========================== SIGN IN ==========================

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check Student
        let user = await StudentModel.findOne({ email });
        let role = "student";

        // If not student → check admin
        if (!user) {
            user = await AdminModel.findOne({ email });
            role = "admin";
        }

        if (!user) {
            return res.json({
                status: false,
                message: "User Not Found!"
            });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.json({
                status: false,
                message: "Invalid Credentials!"
            });
        }

        const otpSended = await otpSender(email);

        return res.json({
            ...otpSended,
            role
        });

    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};


// ========================== VERIFY OTP ==========================

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const record = await OtpCollection.findOne({ email });

        if (!record) {
            return res.json({ status: false, message: "Invalid OTP!" });
        }

        if (record.otp !== otp) {
            return res.json({ status: false, message: "Invalid OTP!" });
        }

        if (record.expiryAt < new Date()) {
            return res.json({ status: false, message: "OTP is expired!" });
        }

        const admin = await AdminModel.findOne({ email });
        const student = await StudentModel.findOne({ email });

        if (!admin && !student) {
            return res.json({ status: false, message: "Account Not Found!" });
        }

        const data = admin || student;

        const role = admin ? "admin" : "student";

        const token = jwt.sign(
            { data, role },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "strict",
            httpOnly: true
        });

        await OtpCollection.deleteMany({ email });

        return res.json({
            status: true,
            message: "OTP verified & Signin successfully!",
            role,
            data
        });

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};


// ========================== CHANGE PASSWORD ==========================

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    let user = await StudentModel.findOne({ email });
    let role = "student";

    if (!user) {
      user = await AdminModel.findOne({ email });
      role = "admin";
    }
    if (!user) {
      return res.json({
        status: false,
        message: "User not found!"
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({
        status: false,
        message: "Old password is incorrect!"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await user.updateOne({ $set: { password: hashedPassword } });

    return res.json({
      status: true,
      message: "Password changed successfully!",
      role
    });

  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    });
  }
};


// ========================== FORGET PASSWORD ==========================

export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const student = await StudentModel.findOne({ email });

        if (!student) {
            return res.json({
                status: false,
                message: "Student not found!"
            });
        }

        const isOtpSent = await otpSender(email);

        return res.json(isOtpSent);

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};


// ========================== VERIFY OTP FOR FORGET PASSWORD ==========================

export const verifyOtpForForgetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const record = await OtpCollection.findOne({ email });

        if (!record) {
            return res.json({ status: false, message: "OTP is incorrect!" });
        }

        if (record.otp !== otp) {
            return res.json({ status: false, message: "OTP is incorrect!" });
        }

        if (record.expiryAt < new Date()) {
            return res.json({ status: false, message: "OTP is expired!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await StudentModel.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        await OtpCollection.deleteMany({ email });

        return res.json({
            status: true,
            message: "Password updated successfully!"
        });

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};






// students collection work 

export const AddclassroomKeys = async (req, res) => {
    const { email, classroomKeys } = req.body;
    try {
        await StudentModel.findOneAndUpdate(
            { email },
            { $Set: { classroomKeys} },
            { new: true }
        );
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}