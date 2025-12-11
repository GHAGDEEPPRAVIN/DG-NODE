import Product from "../modal/productModal.js";
import mongoose from "mongoose";

// Fetch all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products.length) return res.json({ message: "No products found" });
  res.json(products);
};

// Fetch product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findById(id);
  if (!product) return res.json({ message: "No products found" });
  res.json(product);
};

// Search by productName
export const searchByName = async (req, res) => {
  const regex = new RegExp(req.params.name, "i");
  const products = await Product.find({ productName: regex });
  if (!products.length) return res.json({ message: "No products found" });
  res.json(products);
};

// Search by brand
export const searchByBrand = async (req, res) => {
  const products = await Product.find({ brand: req.params.brand });
  if (!products.length) return res.json({ message: "No products found" });
  res.json(products);
};

// Combined search
export const combinedSearch = async (req, res) => {
  const { name, category, brand } = req.query;

  const filter = {};
  if (name) filter.productName = new RegExp(name, "i");
  if (category) filter.category = category;
  if (brand) filter.brand = brand;

  const products = await Product.find(filter);
  if (!products.length) return res.json({ message: "No products found" });

  res.json(products);
};

// Get product by category
export const getByCategory = async (req, res) => {
  const { category } = req.query;
  if (!category) return res.json({ message: "Category is required" });

  const products = await Product.find({ category });
  if (!products.length) return res.json({ message: "No products found" });

  res.json(products);
};

// Filter by price
export const filterByPrice = async (req, res) => {
  const { min, max } = req.query;

  const filter = {};
  if (min) filter.price = { $gte: min };
  if (max) filter.price = { ...filter.price, $lte: max };

  const products = await Product.find(filter);
  if (!products.length) return res.json({ message: "No products found" });

  res.json(products);
};

// Filter by rating
export const filterByRating = async (req, res) => {
  const products = await Product.find({ rating: { $gte: req.params.value } });
  if (!products.length) return res.json({ message: "No products found" });
  res.json(products);
};

// Sort by price
export const sortByPrice = async (req, res) => {
  const { order } = req.query;
  const sortOrder = order === "desc" ? -1 : 1;

  const products = await Product.find().sort({ price: sortOrder });
  if (!products.length) return res.json({ message: "No products found" });

  res.json(products);
};

// Pagination
export const paginateProducts = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = Number(page);
  limit = Number(limit);

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);

  if (!products.length) return res.json({ message: "No products found" });

  res.json({
    page,
    limit,
    totalProducts,
    totalPages,
    products,
  });
};

// Advanced filter
export const advancedFilter = async (req, res) => {
  const { category, minPrice, maxPrice, minRating, sort = "asc", page = 1, limit = 10 } = req.query;

  const filter = {};

  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }
  if (minRating) filter.rating = { $gte: minRating };

  const sortOrder = sort === "desc" ? -1 : 1;

  const totalProducts = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .sort({ price: sortOrder })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  if (!products.length) return res.json({ message: "No products found" });

  res.json({
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    page: Number(page),
    limit: Number(limit),
    products,
  });
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) return res.json({ message: "Product not found" });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.json({ message: "Product not found" });

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
