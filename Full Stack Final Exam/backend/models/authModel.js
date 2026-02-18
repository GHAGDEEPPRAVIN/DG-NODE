import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String}
},{timestamps:true})

export const UsersModel = mongoose.model("users",userSchema) 