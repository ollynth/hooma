import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import CartController from "../controllers/CartController.js";

const cartRouter = express.Router();

cartRouter.get("/", jwtUtils.authenticateToken, CartController.getCart);

cartRouter.post("/", jwtUtils.authenticateToken, CartController.addToCart);

cartRouter.put("/", jwtUtils.authenticateToken, CartController.updateCartItem);

cartRouter.delete("/", jwtUtils.authenticateToken, CartController.deleteCartItem);
export default cartRouter;