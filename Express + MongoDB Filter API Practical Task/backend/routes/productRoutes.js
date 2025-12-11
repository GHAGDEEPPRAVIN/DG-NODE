import express from "express";
import {
  getAllProducts,
  getProductById,
  searchByName,
  searchByBrand,
  combinedSearch,
  getByCategory,
  filterByPrice,
  filterByRating,
  sortByPrice,
  paginateProducts,
  advancedFilter,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../collection/productCollection.js";

const router = express.Router();


router.get("/all", getAllProducts);
router.get("/search/name/:name", searchByName);
router.get("/search/brand/:brand", searchByBrand);
router.get("/search", combinedSearch);
router.get("/filter/price", filterByPrice);
router.get("/filter/rating/:value", filterByRating);
router.get("/filter/advanced", advancedFilter);
router.get("/sort/price", sortByPrice);
router.get("/paginate", paginateProducts);
router.get("/", getByCategory);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;
