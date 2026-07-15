import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import OrderCustomerController from "../controllers/OrderCustomerController.js";
import requireRole from "../middleware/checkUserRole.js";

const orderRouter = express.Router();
orderRouter.use(jwtUtils.authenticateToken);

// CUSTOMERS
// orderRouter.use(requireRole('customer'));
orderRouter.get("/", requireRole('customer'), OrderCustomerController.getMyOrders);
orderRouter.get("/:orderId", requireRole('customer'), OrderCustomerController.getOrderDetail);
orderRouter.post("/preview", requireRole('customer'), OrderCustomerController.previewOrder);
orderRouter.post("/", requireRole('customer'), OrderCustomerController.createOrder);
orderRouter.post("/:orderId/pay", requireRole('customer'), OrderCustomerController.payOrder);

// ADMIN

export default orderRouter;