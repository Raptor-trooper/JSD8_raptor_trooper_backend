import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized: Login Again"
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.user._id);
    if (!user) {
      return res.json({
        success: false,
        message : "Unauthorized: User not found"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
