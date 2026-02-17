import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
}, { timestamps: true })

export const AdminModel = mongoose.model("admin",adminSchema)

const studentSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    classroomKeys:[String], 
    tasks:[{type:String}]
}, { timestamps: true })

export const StudentModel = mongoose.model("students",studentSchema)