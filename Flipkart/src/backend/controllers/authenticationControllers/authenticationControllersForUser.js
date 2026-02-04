// imported models for CRUD 
import { UserCollection } from "../../models/authenticationModels/authenticationModel.js";
// imported bcrypt for hash the password
import bcrypt from "bcrypt"
// imported otpSender from servies folder
import { otpSender } from "../../servies/otpServies.js";
import { OtpCollection } from "../../models/authenticationModels/otpModel.js";
// imported jwt for set token in cookies for more secure
import jwt from "jsonwebtoken";

// =============================== authentication code for users ===============================

// ------------------------------- signup code for users -------------------------------

export const signUpUser = async (req, res) => {
    const userData = req.body;
    try {
        // convert string plain password into hashed password by bcrypt
        const hashedPassword = await bcrypt.hash(userData.password, 12)

        // create data into database
        const record = await UserCollection.create({
            email: userData.email,
            name: userData.name,
            password: hashedPassword
        })

        // response after above process is successful
        res.json({ status: true, message: "User Sign-Up succesfully..." })

    } catch (error) {
        // response if error occurs in try block
        res.status(400).json({ status: false, message: "failed to Sign-up User !", error: error.message })
    }
}

// // ------------------------------- signin code for users -------------------------------

// export const signInUser = async (req, res) => {
//     const userData = req.body;
//     try {
//         // find the user for the user collection by email
//         const user = await UserCollection.findOne({ email: userData.email })

//         // check where the user is null or not
//         if (!user) {
//             return res.json({ status: false, message: "User Not Found !" })
//         }

//         // if user exists in the collection then check password entered is match or not
//         const passwordMatched = await bcrypt.compare(userData.password, user.password)

//         // if password is matched or not, bcrypt returns boolen value if it true or not conditon below
//         if (!passwordMatched) {
//             return res.json({ status: false, message: "Password is Invalid credencial !" })
//         }

//         // after checking above the user is verified in database then otp send to user email function below
//         const otpSended = await otpSender(userData.email)

//         // response after sending the otp 
//         res.json(otpSended)

//     } catch (error) {
//         // response if error occurs in try block
//         res.json({ status: false, message: "failed to Sign-In User !", error: error.message })
//     }
// }

// // ------------------------------- verify otp code for users -------------------------------

// export const verifyOtpUser = async (req, res) => {
//     const userData = req.body;
//     try {
//         // check the record of otp in getted userData.email
//         const record = await OtpCollection.findOne({ email: userData.email })

//         // checks the record is null or not 
//         if (!record) {
//             return res.json({ status: false, message: "Invalid OTP !" })
//         }

//         // checks the expiry of the OTP present in the database
//         if (record.expiryAt < new Date(Date.now())) {
//             return res.json({ status: false, message: "OTP is expired !" });
//         }

//         // delete all otps on the email present in the database after validate
//         await OtpCollection.deleteMany({ email: userData.email })

//         // get user from usercollection and set in the variable to user
//         const user = await UserCollection.findOne({ email: userData.email })

//         // after get the user then set the user as token in jsonwebtoken
//         const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {
//             expiresIn: "1d",
//         })

//         // after setting the user in jsonwebtoken then the token set in cookie 
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

// =============================== change and forget password for users ===============================

// ------------------------------- Change Password code for users -------------------------------

export const changePasswordForUser = async (req, res) => {
    const userData = req.body;
    try {
        // finding user is present or not in the usercollection database
        const user = await UserCollection.findOne({ email: userData.email });
        // check if user is present or not 
        if (!user) {
            // response when user is not present
            return res.status(404).json({ status: false, message: "User not found !" });
        }
        // oldpassword == database password
        const isMatch = await bcrypt.compare(userData.oldPassword, user.password);
        // condition return by bcrypt in boolen if it is true of false
        if (!isMatch) {
            // respose when bcrypt return false 
            return res.json({ status: false, message: "your old password is incorrect !" });
        }
        // after above process update password, new password -> bcrypt
        const hashed = await bcrypt.hash(userData.newPassword, 12);
        await UserCollection.updateOne({ email }, {
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

// ------------------------------- forget Password code for users -------------------------------

export const forgetPasswordForUser = async (req, res) => {
    const userData = req.body
    try {
        // find user in usercollection in database 
        const user = await UserCollection.findOne({ email:userData.email });
        // check if user is present or not 
        if (!user) {
            // response when user is not present
            return res.json({ status: false, message: "user not found !" });
        }
        // after checking the user we send otp on there email
        const isOtpSent = await otpSender(email);
        // response of otp which is not send to successfully send on email
        res.json(isOtpSent);
    } catch (error) {
        // response when any error occurs in try block
        return res.json({ status: false, message: err.message });
    }
}

// ------------------------------- Verify OTP for forget Password code for users -------------------------------

export const verifyOtpForForgetPasswordForUser = async(req,res) => {
    // userdata have three infomation email, otp and newPassword
    const userData = req.body 
    try {
        // checking the email or otp is present in the otpCollection database or not 
        const record = await OtpCollection.findOne({email:userData.email})
        // condition for email or otp is not present in the database
        if(!record)
        {
            // response when record is not present
            return res.json({ status: false, message: "OTP is incorrect !" })
        }
        // if otp is preswent in the database then below condition for expiry of otp  
        if(record.expiryAt < new Date(Date.now()))
        {
            return res.json({ status: false, message: "otp is expired !" });
        }
        // convert the newpassword to the hashed and stored in the hashedPassword variable
        const hashedPassword = await bcrypt.hash(userData.newPassword,12)
        // update password in usercollection database accoding to email
        await UserCollection.updateOne({email:userData.email},{
            $set: {
                password: hashedPassword
            }
        })
        // response when the password updated successfully   
        return res.json({ status: false, message: "password updated successfully !" });
    } catch (error) {
        // response for error occurs in try block
        return res.json({ status: false, message:error.message });
    }
}