import express from "express";
import jwtUtils from "../utils/jwtUtils.js";
import ProductController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/:id", ProductController.getProductById);

productRouter.post("/", jwtUtils.authenticateToken, ProductController.createProduct);
// // productRouter.post("/", upload.single('image'), createProduct);

productRouter.put("/:id", jwtUtils.authenticateToken, ProductController.updateProduct);

productRouter.delete("/:id", jwtUtils.authenticateToken, ProductController.deleteProduct);

export default productRouter;