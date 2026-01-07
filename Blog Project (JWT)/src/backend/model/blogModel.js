import mongoose from "mongoose";

// ================================================  Model for Login  =================================================

// define schema for login
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

// export model for login
export const UserModel = mongoose.model("users",userSchema)

// ================================================  Model for BLOGS  ==================================================

// define schema for blog CRUD
const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    image_path:{type:String,required:true},
    author_reference:{type:String,required:true}
},{timestamps: true})

// export model for blog CRUD
export const BlogsModel = mongoose.model("blogs",blogSchema)

// ================================================  Model for OTP  ===================================================

//  define schema for OTP
const otpSchema = new mongoose.Schema({
    email: String,
    otp: Number,
    expiryAt: Date
}, { timestamps: true });

// export model for OTP 
export const OTP = mongoose.model("otp", otpSchema);