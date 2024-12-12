import express from "express";
import {
  login,
  register,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
// userRouter.post("/userprofile", authUser, profile);

export default userRouter;
