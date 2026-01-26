import express from "express";
import UserController from "../controllers/UserController.js";
import jwtUtils from "../utils/jwtUtils.js";

const userRouter = express.Router();

userRouter.get("/profile", jwtUtils.authenticateToken, UserController.getUserProfile);
userRouter.put("/profile", jwtUtils.authenticateToken, UserController.updateUserProfile);

export default userRouter;