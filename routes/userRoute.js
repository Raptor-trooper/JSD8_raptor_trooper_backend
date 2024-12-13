import express from "express";
import {
  getProfile,
  login,
  register,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

// login/register
userRouter.post("/register", register);
userRouter.post("/login", login);

//User profile
userRouter.get("/userprofile", authUser, getProfile);
userRouter.post("/userprofile", authUser, updateProfile);

export default userRouter;
