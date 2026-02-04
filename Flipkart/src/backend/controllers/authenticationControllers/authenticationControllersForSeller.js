// imported models for CRUD 
import { SellerCollection } from "../../models/authenticationModels/authenticationModel.js";
// imported bcrypt for hash the password
import bcrypt from "bcrypt"
// imported otpSender from servies folder
import { otpSender } from "../../servies/otpServies.js";
// imported jwt for set token in cookies for more secure
import jwt from "jsonwebtoken";

// =============================== authentication code for sellers ===============================

// ------------------------------- signup code for sellers -------------------------------

export const signUpSellers = async (req, res) => {
    const sellerData = req.body;
    try {
        // convert string plain password into hashed password by bcrypt
        const hashedPassword = await bcrypt.hash(sellerData.password, 12)

        // create data into database
        const record = await SellerCollection.create({
            email: sellerData.email,
            name: sellerData.name,
            password: hashedPassword,
            bussiness: sellerData.bussiness,
            bussiness_name: sellerData.bussiness_name
        })

        // response after above process is successful
        res.json({ status: true, message: "Seller Sign-Up succesfully..." })

    } catch (error) {
        // response if error occurs in try block
        res.status(400).json({ status: false, message: "failed to Sign-up Seller !", error: error.message })
    }
}

// // ------------------------------- signin code for sellers -------------------------------

// export const signInSellers = async (req, res) => {
//     const sellerData = req.body;
//     try {
//         // find the seller for the seller collection by email
//         const seller = await SellerCollection.findOne({ email: sellerData.email })

//         // check where the seller is null or not
//         if (!seller) {
//             return res.json({ status: false, message: "Seller Not Found !" })
//         }

//         // if seller exists in the collection then check password entered is match or not
//         const passwordMatched = await bcrypt.compare(sellerData.password, seller.password)

//         // if password is matched or not, bcrypt returns boolen value if it true or not conditon below
//         if (!passwordMatched) {
//             return res.json({ status: false, message: "Password is Invalid credencial !" })
//         }

//         // after checking above the seller is verified in database then otp send to seller email function below
//         const otpSended = await otpSender(sellerData.email)

//         // response after sending the otp 
//         res.json(otpSended)

//     } catch (error) {
//         // response if error occurs in try block
//         res.status(400).json({ status: false, message: "failed to Sign-In Seller !", error: error.message })
//     }
// }

// // ------------------------------- verify otp code for sellers -------------------------------

// export const verifyOtpSellers = async (req,res) => {
//     const sellerData = req.body;
//     try {
//         // check the record of otp in getted sellerData.email
//         const record = await OtpCollection.findOne({ email: sellerData.email })

//         // checks the record is null or not 
//         if (!record) {
//             return res.json({ status: false, message: "Invalid OTP !" })
//         }

//         // checks the expiry of the OTP present in the database
//         if (record.expiryAt < new Date(Date.now())) {
//             return res.json({ status: false, message: "OTP is expired !" });
//         }

//         // delete all otps on the email present in the database after validate
//         await OtpCollection.deleteMany({ email: sellerData.email })

//         // get seller from SellerCollection and set in the variable to user
//         const seller = await SellerCollection.findOne({ email: sellerData.email })

//         // after get the seller then set the seller as token in jsonwebtoken
//         const token = jwt.sign({ ...seller }, process.env.SECRET_KEY, {
//             expiresIn: "1d",
//         })

//         // after setting the seller in jsonwebtoken then the token set in cookie 
//         res.cookie("auth_token", token, {
//             maxAge: 1000 * 60 * 60 * 24,
//             sameSite: "strict",
//             httpOnly: true
//         })

//         // above we set jwt and cookie both expire in 24 hrs

//         // response after above process the is completed 
//         res.json({ status: true, message: "OTP is verified & Signin successfully !" });

//     } catch (error) {
//         // response if any error occurs in try block
//         res.json({ status: false, message: err.message })
//     }
// }

// ------------------------------- Change Password code for seller -------------------------------

export const changePasswordForSeller = async (req, res) => {
    const sellerData = req.body;
    try {
        // finding user is present or not in the usercollection database
        const seller = await sellerData.findOne({ email: sellerData.email });
        // check if user is present or not 
        if (!seller) {
            // response when user is not present
            return res.status(404).json({ status: false, message: "Seller not found !" });
        }
        // oldpassword == database password
        const isMatch = await bcrypt.compare(sellerData.oldPassword, seller.password);
        // condition return by bcrypt in boolen if it is true of false
        if (!isMatch) {
            // respose when bcrypt return false 
            return res.json({ status: false, message: "your old password is incorrect !" });
        }
        // after above process update password, new password -> bcrypt
        const hashed = await bcrypt.hash(userData.newPassword, 12);
        await SellerCollection.updateOne({ email : seller.email }, {
            $set: {
                password: hashed
            }
        }); //email -> password - hashed
        return res.json({ status: true, message: "password changed successfully !" })
    } catch (err) {
        // response when any error occurs in try block
        return res.json({ status: false, message: err.message });
    }

}

// =============================== change and forget password for seller ===============================

// ------------------------------- forget Password code for seller -------------------------------

export const forgetPasswordForSeller = async (req, res) => {
    const sellerData = req.body
    try {
        // find seller in sellercollection in database 
        const seller = await SellerCollection.findOne({ email:sellerData.email });
        // check if user is present or not 
        if (!seller) {
            // response when seller is not present
            return res.json({ status: false, message: "Seller not found !" });
        }
        // after checking the seller we send otp on there email
        const isOtpSent = await otpSender(seller.email);
        // response of otp which is not send to successfully send on email
        res.json(isOtpSent);
    } catch (error) {
        // response when any error occurs in try block
        return res.json({ status: false, message: err.message });
    }
}
