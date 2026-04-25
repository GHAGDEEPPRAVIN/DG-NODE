import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a user."],
        trim:true,
        lowercase:true,
        unique:[true,"Email alerady exists."]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an Account."]
    },
    password:{
        type:String,
        required:[true,"Password is required for creating an Account."],
        minlength:[6,"Password should contain more than 6 character"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }
},{
    timestamps:true
});

export const AuthModel = mongoose.model("auth",authSchema)