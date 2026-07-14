import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import CartController from "../controllers/CartController.js";
import requireRole from "../middleware/checkUserRole.js";

const cartRouter = express.Router();
cartRouter.use(jwtUtils.authenticateToken);
cartRouter.use(requireRole('customer'));

cartRouter.get("/", CartController.getCart);
cartRouter.post("/:productId", CartController.addToCart);
cartRouter.delete("/", CartController.deleteCartItem);
export default cartRouter;