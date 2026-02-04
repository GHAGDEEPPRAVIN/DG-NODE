import { UserCollection } from "../../models/authenticationModels/authenticationModel.js";

export const getAllUser = async(req,res) => {
    try {
        const user = await UserCollection.find();
        return res.json({status:true,message:"User Fetched Successfully..."})
    } catch (error) {
        return res.json({status:true,message:error.message})
    }
}