import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized: No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "Unauthorized: User not found"
      })
    }
    if (user.role !== "admin" && decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Unauthorized: User is not an Admin"
      })
    }

    req.body.userId = decoded.userId;
    req.body.role = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error AdminAuth" });
  }
};

export default adminAuth;
