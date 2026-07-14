import express from "express";
import UserController from "../controllers/UserController.js";
import jwtUtils from "../utils/jwtUtils.js";

const userRouter = express.Router();
userRouter.use(jwtUtils.authenticateToken); 

userRouter.get("/profile", UserController.getUserProfile);
userRouter.put("/profile", UserController.updateUserProfile);

export default userRouter;