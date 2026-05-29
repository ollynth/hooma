import express from "express";
import {registerUser, loginUser} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", loginUser);
export default authRouter;