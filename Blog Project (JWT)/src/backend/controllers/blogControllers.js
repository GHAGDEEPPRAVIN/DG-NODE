// blogControllers.js
import bcrypt from "bcrypt";
import { UserModel, OTP, BlogsModel } from "../model/blogModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Dotenv from "dotenv";

Dotenv.config();

// ==========================
// Helper: generate 6-digit OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// ==========================
// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// ==========================
// Sign Up
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json({ message: "User registered successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during sign up" });
    }
};

// ==========================
// Sign In → Send OTP
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not registered!" });

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) return res.status(400).json({ message: "Invalid password!" });

        // Generate OTP
        const otp = generateOtp();
        const expiryAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

        // Save OTP in DB
        await OTP.create({ email, otp, expiryAt });

        // Send OTP via email
        await transporter.sendMail({
            from: `OTP Verification <${process.env.EMAIL}>`,
            to: email,
            subject: "Your OTP",
            text: `Your OTP is ${otp}. It is valid for 2 minutes.`
        });

        res.json({ message: "OTP sent successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during sign in" });
    }
};

// ==========================
// Verify OTP → Generate JWT
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        // Find latest OTP for this email
        const record = await OTP.findOne({ email }).sort({ createdAt: -1 }); if (!record) return res.status(400).json({ message: "OTP not found!" }); if (record.expiryAt < new Date()) return res.status(400).json({ message: "OTP expired!" }); if (record.otp !== Number(otp)) return res.status(400).json({ message: "Invalid OTP!" });
        // ✅ Use email from OTP record to generate JWT
        const user = await UserModel.findOne({ email: record.email }); if (!user) return res.status(400).json({ message: "User not found!" }); const token = jwt.sign({ email: user.email, name: user.name }, process.env.SECRET_KEY, { expiresIn: "1h" }); res.cookie("auth_token", token, { httpOnly: true, path: "/", sameSite: "lax", maxAge: 1000 * 60 * 60 }); res.json({ message: "OTP verified. Login successful!" });
    } catch (err) { console.error(err); res.status(500).json({ message: "Server error during OTP verification" }); }
};



// ==========================
// Protected Home Route
export const home = (req, res) => {
    res.json({
        message: "Welcome to Home Page",
        user: req.user
    });
};

export const addBlog = async (req, res) => {
    try {
        const blog = await BlogsModel.create({
            title: req.body.title,
            content: req.body.content,
            image_path: req.file.filename,
            author_reference: req.user.name
        });

        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: "Blog create failed" });
    }
};



export const getBlog = async (req, res) => {
    try {
        const blogs = await BlogsModel.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Fetching Blog Failed" });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.image_path = req.file.filename;

        const blog = await BlogsModel.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(blog);

        res.json({ message: "Blog updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Updating Blog Failed" });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        await BlogsModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Deleting Blog Failed" });
    }
};
