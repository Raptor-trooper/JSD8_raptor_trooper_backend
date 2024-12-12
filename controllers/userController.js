import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id, role) => {
  return jwt.sign({ userId: id, role }, process.env.JWT_SECRET);
};

// Route for user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id, user.role);
      res.json({ success: true, role: user.role, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // const token = createToken(user._id);
    res.json({ success: true, newUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user profile
// const profile = async (req, res) => {
//   try {
//     const { userId, address } = req.body;
//     const user = await userModel.findByIdAndUpdate({ userId });

//     const userData = {
//       address,
//     }
//     await userModel.save(userData);
//   } catch (error) {
    
//   }
// }
export { login, register };
