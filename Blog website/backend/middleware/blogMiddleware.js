import { UserModel } from "../models/blogModel.js";

export const checkAuth = async (req, res, next) => {
  try {
    const userId = req.cookies.auth_token;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please sign up." });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid user. Please sign up." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
