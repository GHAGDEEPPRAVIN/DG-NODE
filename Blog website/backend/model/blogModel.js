import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image_path: { type: String, required: true },
    author_reference: { type: String, required: true },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model("Blog", blogSchema);
