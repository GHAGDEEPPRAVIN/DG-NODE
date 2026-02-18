import mongoose, { Types } from "mongoose";

const articlesSchema = mongoose.Schema({
    title:{Type:String},
    content:{Type:String},
    author:{type:String},
},{Timestamps:true})

export const articlesModel = mongoose.model("articles",articlesSchema)