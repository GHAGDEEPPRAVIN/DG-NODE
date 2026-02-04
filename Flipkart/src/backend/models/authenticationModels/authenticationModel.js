import mongoose from "mongoose";

// =============================== Schema and Model for users ===============================

// schema for users
const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    gender:{type:String},
    phone:{type:String},
    orders:{
        productName:{type:String},
        productImage:{type:String},
        productColor:{type:String},
        productPrice:{type:String},
        productStatus:{type:String,state:["Delivered", "Refund", "Shipped","Out for delivery","Order Confirmed"]},
    }
},{ timestamps: true })

// export model for users collection
export const UserCollection = mongoose.model("Users",userSchema)

// =============================== Schema and Model for sellers ===============================

// schema for seller
const sellerSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String,required: true,unique: true},
    password: {type: String},
    bussiness: {type: String},
    bussiness_name: {type: String},
    aadhar_card:[{type:String}],
    pan_card:[{type:String}],
    pickupAddress: {street: String,city: String,state: String,pincode: String},
    returnAddress: {street: String,city: String,state: String,pincode: String},
    verificationStatus: {type: String,state: ["pending", "approved", "rejected"],default: "pending"}
})

// export model for sellers collection
export const SellerCollection = mongoose.model("Sellers",sellerSchema)