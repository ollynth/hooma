import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import OrderCustomerController from "../controllers/OrderCustomerController.js";

const orderRouter = express.Router();
const auth = jwtUtils.authenticateToken;

// CUSTOMERS
orderRouter.get("/", auth, OrderCustomerController.getMyOrders);
orderRouter.post("/preview", auth, OrderCustomerController.previewOrder);
orderRouter.post("/", auth, OrderCustomerController.createOrder);

// ADMIN

export default orderRouter;