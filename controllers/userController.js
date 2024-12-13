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
    res.json({ success: true, newUser: { name: newUser.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for get user profile
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findOne(req.body.UserId);
    res.json({
      success: true,
      user: {
        id: req.body.UserId,
        name: user.name,
        email: user.email,
        delivery: user.delivery

        // : {
          //   firstName: user.delivery.firstName,
          //   lastName: user.delivery.lastName,
          //   country: user.delivery.country,
          //   address: user.delivery.address,
        //   zip: user.delivery.zip,
        //   phone: user.delivery.phone,
        // }
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
// Route for update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, delivery } = req.body;

    await userModel.findByIdAndUpdate(userId, { address });
    res.json({
      success: true,
      message: "Cart Updated",
      delivery
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export { login, register, getProfile, updateProfile };
