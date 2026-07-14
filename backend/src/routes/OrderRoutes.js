import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import OrderCustomerController from "../controllers/OrderCustomerController.js";
import requireRole from "../middleware/checkUserRole.js";

const orderRouter = express.Router();
orderRouter.use(jwtUtils.authenticateToken);

// CUSTOMERS
orderRouter.use(requireRole('customer'));
orderRouter.get("/", OrderCustomerController.getMyOrders);
orderRouter.post("/preview", OrderCustomerController.previewOrder);
orderRouter.post("/", OrderCustomerController.createOrder);

// ADMIN

export default orderRouter;