import mongoose from "mongoose";

const classroomSchema = mongoose.Schema({
    title:{type:String},
    assingments : [
        {
            assingmentTitle:{type:String},
            assingmentSubTitle:{type:String},
            assingmentGrade:{type:String},
            assingmentDueDate:{type:Date}
        }
    ],
    joiningCode:{type:String},
    studentsData:{type:mongoose.Schema.Types.ObjectId,ref:"students"},
    status: {type: String,enum: ["active", "archived"],default: "active"}
});

export const ClassRoomModel = mongoose.model("classroom",classroomSchema)