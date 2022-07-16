import express from "express";
import {
  addNewUser,
  getUserProfile,
  login,
  logoutUser,
} from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/newUser", addNewUser);
userRouter.post("/login", login);
userRouter.get("/user", auth, getUserProfile);
userRouter.post("/logOut", auth, logoutUser);
