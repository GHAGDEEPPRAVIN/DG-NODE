import express from "express";
import { getAllProduct,getProductBySlug,createProduct, updateProduct, deleteProduct} from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.get("/",getAllProduct);
productRouter.get("/:slug",getProductBySlug);
productRouter.post("/",createProduct);
productRouter.put("/update/:slug",updateProduct)
productRouter.patch("/delete/:slug",deleteProduct)

export default productRouter;