import jwt from "jsonwebtoken";
import { UsersModel } from "../models/authModel.js";
import bcrypt from "bcrypt"
import { SECRET_KEY } from "../utiles/globals.js";


// ======================================= Signup code =======================================

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {

        const hashedPassword = bcrypt.hash(password, 12)

        const result = await UsersModel.create({
            name, 
            email,
            password: hashedPassword, 
            role
        })

        res.json({ status: true, message: "User Sigup successfully...",result })
    } catch (error) {
        res.json({ status: false, message: "Failed to Signup User",error:error.message })
    }
}

// ======================================= Signin code =======================================

export const signin = async(req,res) => {
    const {email, password, role} = req.body;
    try {
        const user = await UsersModel.findOne({email})

        if(!user)
        {
            res.json({ status: false, message: "User Not Found !"})
        }

        const matchPasseord = await bcrypt.compare(password,user.password)

        if(!matchPasseord)
        {
            res.json({ status: false, message: "Password is invalid cendencials !"})
        }

        if(!role==user.role)
        {
            res.json({status: false, message: "Role is invalid cendencials !"})
        }
        
        const token = jwt.sign({user},SECRET_KEY,{
            expiresIn:"1d"
        })

        res.cookie("auth_token",token,{
            maxAge:60*60*24*1,
        })

        res.json({status:true,message:"User Signin Successfully...",user})

    } catch (error) {
        res.json({ status: false, message:"Failed To Signin User !",error:error.message })
    }
}
