import model from "../../repository/index.js";
import { ApplicationError } from "../../utils/applicationError.js";
import mongoose from "mongoose";

export const addProduct = async (params) => {
  const newProduct = await model.product.create(params);
  return newProduct;
};
export const getAll = async () => {
  return await model.product.find();
};
export const getOne = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApplicationError("Invalid product ID", 400);
  }
  const product = await model.product.findById(productId);
  if (!product) {
    throw new ApplicationError("Product not found", 404);
  }
  return product;
};
export const updateProduct = async (productId, newPrice) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApplicationError("Invailid product ID", 400);
  }
  if (!newPrice) {
    throw new ApplicationError("Update newPrice is required", 400);
  }
  if (!newPrice && typeof newPrice !== Number) {
    throw new ApplicationError("Price must be a number", 400);
  }
  const product = await model.product.findByIdAndUpdate(productId, newPrice, {
    new: true,
  });

  if (!product) {
    throw new ApplicationError("Product not found", 400);
  }
  return product;
};
export const deleteProduct = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApplicationError("Invalid ProductId", 400);
  }
  const product = await model.product.findByIdAndDelete(productId);
  if (!product) {
    throw new ApplicationError("Product not found", 404);
  }
  return product;
};
export const filterProduct = async (filters) => {
  const query = {};
  //By category
  if (filters.category) {
    query.category = filters.category;
  }
  //Price based
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};

    if (filters.minPrice) {
      query.price.$gte = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      query.price.$lte = Number(filters.maxPrice);
    }
  }
  //size based
  if (filters.size) {
    query.size = filters.size;
  }
  return await model.product.find(query);
};
export const rateProduct = async (userId, productId, rating) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid User ID", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApplicationError("Invalid Product ID", 400);
  }
  const product = await model.product.findById(productId);

  if (!product) {
    throw new ApplicationError("Product not found", 404);
  }
  // Initialize rating array if not present
  if (!product.ratings) {
    product.ratings = [];
  }
  //check if user is already rated
  const existingRatingIndex = product.ratings.findIndex(
    (r) => r.userId.toString() === userId,
  );

  if (existingRatingIndex >= 0) {
    // up date existing rating
    product.ratings[existingRatingIndex].rating = rating;
  } else {
    // Add new rating
    product.ratings.push({
      userId,
      rating,
    });
  }
  await product.save();
  return product;
};

//add bulk products
export const bulkCreateService = async (productArray) => {
  const bulkAddProducts = await model.product.insertMany(productArray);
  return bulkAddProducts;
};
