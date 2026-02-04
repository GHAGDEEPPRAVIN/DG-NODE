import jwt from "jsonwebtoken";

export const checkUser = (req, res) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; 
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid token"
    });
  }
};
