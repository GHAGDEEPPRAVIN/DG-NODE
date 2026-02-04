import mongoose from "mongoose";

// =============================== Schema and Model for otp servies ===============================

// schema for opt servies
const optSchema = mongoose.Schema({
    email:{type: String,required: true,unique: true},
    otp:{type: Number,required: true},
    expiryAt: Date
},{ timestamps: true })

// export model for opt servies collection
export const OtpCollection = mongoose.model("otp",optSchema)