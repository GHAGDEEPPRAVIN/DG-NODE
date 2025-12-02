import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    year: { type: Number, required: true },
    phone : { type: Number, required: true },
    course: { type: String, required: true },
    address : { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);