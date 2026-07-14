import express from "express";
import UserController from "../controllers/UserController.js";
import jwtUtils from "../utils/jwtUtils.js";
import requireRole from "../middleware/checkUserRole.js";

const userRouter = express.Router();
userRouter.use(jwtUtils.authenticateToken); 

userRouter.get("/profile", requireRole('customer'), UserController.getUserProfile);
userRouter.put("/profile", requireRole('customer'), UserController.updateUserProfile);

export default userRouter;