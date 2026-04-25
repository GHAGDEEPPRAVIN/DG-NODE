import { AuthModel } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { otpSender } from "../servies/otpServies.js";
import { OTPModel } from "../models/otpModel.js";
import jwt from "jsonwebtoken";

//* =============================================== || Sign Up code ||  =============================================== *//

export const signUp = async (req, res) => {
    // get data from user for register in database
    const data = req.body;
    try {
        // hashed the password before entre in the database
        const hashedPassword = await bcrypt.hash(data.password, 12)

        // register the user into the Database.
        const result = await AuthModel.create({
            email: data.email,
            name: data.name,
            password: hashedPassword,
            role: "user",
        })

        // Response after registre the user into the database
        return res.json({ status: true, message: "User Created Successfully...", result })

    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}

//* =============================================== || Sign In code ||  =============================================== *//

export const signIn = async (req, res) => {
    // get data from user for register in database
    const data = req.body;
    try {
        // get the User into the database and store that single user into user variable.
        const user = await AuthModel.findOne({ email: data.email });

        // if user data is not avalable then this condition runs and return teh response
        if (!user) {
            return res.json({ status: false, message: "User Not exists !" })
        }

        const matchPassword = await bcrypt.compare(data.password, user.password)
        console.log(matchPassword)

        if (!matchPassword) {
            return res.json({ status: false, message: "Password is Invalid credentials !" })
        }

        const otpsended = await otpSender(user.email)

        return res.json({
            ...otpsended,
            role: user.role
        })

    } catch (error) {
        return res.json({ status: false, message: error.message })
    }
}


//* =============================================== || Verify OTP code ||  =============================================== *//

export const verifyOtp = async (req, res) => {
    const data = req.body;

    try {
        const { email, otp } = data; 

        const record = await OTPModel.findOne({ email });
        if (!record) {
            return res.json({ status: false, message: "OTP not found!" });
        }

        if (record.otp != otp) { 
            return res.json({ status: false, message: "Invalid OTP!" });
        }

        if (record.expiryAt < new Date()) {
            return res.json({ status: false, message: "OTP is expired!" });
        }

        const user = await AuthModel.findOne({ email });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            (process.env.SECRET_KEY),
            { expiresIn: "1d" }
        );

        res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "strict",
            httpOnly: true
        });

        await OTPModel.deleteOne({ email }); 

        return res.json({
            status: true,
            message: "OTP verified & Signin successfully!",
            role: user.role, // ✅ fix
            data: user
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

//* =============================================== || change Password code ||  =============================================== *//

export const changePassword = async (req, res) => {
//   const { email, oldPassword, newPassword } = req.body;
    const data = req.body;

  try {
    let user = await AuthModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);

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

//* =============================================== || Forget Password code ||  =============================================== *//

export const forgetPassword = async (req, res) => {
    const data = req.body;

    try {
        const user = await AuthModel.findOne({ email:data.email });

        if (!user) {
            return res.json({
                status: false,
                message: "user not found!"
            });
        }

        const isOtpSent = await otpSender(email);

        return res.json(isOtpSent);

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};

//* =============================================== || Verify OTP For password code ||  =============================================== *//

export const verifyOtpForForgetPassword = async (req, res) => {
    // const { email, otp, newPassword } = req.body;
    const data = req.body;

    try {
        const record = await OTPModel.findOne({ email:data.email });

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

        await AuthModel.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        await OTPModel.deleteMany({ email });

        return res.json({
            status: true,
            message: "Password updated successfully!"
        });

    } catch (error) {
        return res.json({ status: false, message: error.message });
    }
};