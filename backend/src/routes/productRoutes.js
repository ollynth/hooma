import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
// import { getAllProducts, getProductById,  updateProduct, deleteProduct } from "../controllers/productController.js";
import ProductController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", jwtUtils.authenticateToken, ProductController.getAllProducts)
productRouter.get("/:id", ProductController.getProductById)

productRouter.post("/", jwtUtils.authenticateToken, ProductController.createProduct);
// // productRouter.post("/", upload.single('image'), createProduct);

// productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", ProductController.deleteProduct);
export default productRouter;