import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import ProductController from "../controllers/ProductController.js";
import requireRole from "../middleware/checkUserRole.js";

const productRouter = express.Router();
const auth = jwtUtils.authenticateToken;

productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/:id", ProductController.getProductById);

productRouter.post("/", auth, requireRole('admin'), ProductController.createProduct);
// productRouter.post("/", upload.single('image'), createProduct);
productRouter.put("/:id", auth, requireRole('admin'), ProductController.updateProduct);
productRouter.delete("/:id", auth, requireRole('admin'), ProductController.deleteProduct);

export default productRouter;