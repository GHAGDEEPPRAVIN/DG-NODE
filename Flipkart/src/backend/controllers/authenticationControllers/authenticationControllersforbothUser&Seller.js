import { SellerCollection, UserCollection } from "../../models/authenticationModels/authenticationModel.js";
import { otpSender } from "../../servies/otpServies.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OtpCollection } from "../../models/authenticationModels/otpModel.js";
import { SECRET_KEY } from "../../env/globals.js";


// ------------------------------- sign in code for user & seller -------------------------------

export const signInForUserAndSeller = async (req, res) => {
    const allData = req.body;
    try {
        // find the seller for the seller collection by email
        const seller = await SellerCollection.findOne({ email: allData.email })
        const user = await UserCollection.findOne({ email: allData.email })

        if (user) {
            // check where the User is null or not
            if (!user) {
                return res.json({ status: false, message: "User Not Found !" })
            }

            // if seller exists in the collection then check password entered is match or not
            const passwordMatched = await bcrypt.compare(allData.password, user.password)

            // if password is matched or not, bcrypt returns boolen value if it true or not conditon below
            if (!passwordMatched) {
                return res.json({ status: false, message: "Password is Invalid credencial !" })
            }

            // after checking above the user is verified in database then otp send to users email function below
            const otpSended = await otpSender(allData.email)

            // response after sending the otp 
            res.json(otpSended)
        }

        else if (seller) {
            // check where the seller is null or not
            if (!seller) {
                return res.json({ status: false, message: "seller Not Found !" })
            }

            // if seller exists in the collection then check password entered is match or not
            const passwordMatched = await bcrypt.compare(allData.password, seller.password)

            // if password is matched or not, bcrypt returns boolen value if it true or not conditon below
            if (!passwordMatched) {
                return res.json({ status: false, message: "Password is Invalid credencial !" })
            }

            // after checking above the seller is verified in database then otp send to seller email function below
            const otpSended = await otpSender(allData.email)

            // response after sending the otp 
            res.json(otpSended)
        }


    } catch (error) {
        // response if error occurs in try block
        res.status(400).json({ status: false, message: error.message })
    }
}

// ------------------------------- verify otp code for user & seller -------------------------------

export const verifyOtpForUserAndSeller = async (req, res) => {
    const allData = req.body;
    try {
        // check the record of otp in getted sellerData.email
        const record = await OtpCollection.findOne({ email: allData.email });

        // checks the record is null or not
        if (!record) {
            return res.json({ status: false, message: "Invalid OTP !" });
        }

        // checks the otp is match or not
        if (record.otp !== allData.otp) {
            return res.json({ status: false, message: "Invalid OTP !" });
        }

        // checks the expiry of the OTP present in the database
        if (record.expiryAt < new Date(Date.now())) {
            return res.json({ status: false, message: "OTP is expired !" });
        }

        // find the user or seller form the user or seller collection by email
        const seller = await SellerCollection.findOne({ email: allData.email });
        const user = await UserCollection.findOne({ email: allData.email });

        // checks the user or seller is exist or not
        if (!user && !seller) {
            return res.json({ status: false, message: "Account Not Found !" });
        }

        // after get the user or seller then set the token in jsonwebtoken
        const token = jwt.sign(
            {
                id: user ? user._id : seller._id,
                email: allData.email,
                role: user ? "user" : "seller",
            },
            SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        // after setting the token in jsonwebtoken then the token set in cookie
        res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "strict",
            httpOnly: true,
        });

        // delete all otps on the email present in the database after validate
        await OtpCollection.deleteMany({ email: allData.email });

        // response after above process the is completed
        return res.json({
            status: true,
            message: "OTP is verified & Signin successfully !",
        });

    } catch (error) {
        // response if any error occurs in try block
        return res.json({ status: false, message: error.message });
    }
};
