import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const { token, role } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    // const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    //   return res.json({
    //     success: false,
    //     message: "Not Authorized Login Again",
    //   });
    // }

    if (role !== "admin") {
      return res.status(403).json({ message: "You are not admin" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error AdminAuth" });
  }
};

export default adminAuth;
