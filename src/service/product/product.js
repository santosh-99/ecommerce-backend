import model from "../../repository/index.js";
import { ApplicationError } from "../../utils/applicationError.js";
import mongoose from "mongoose";

export const addProduct = async (params) => {
  return await model.product.create(params);
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


export const updateProduct = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApplicationError("Invailid product ID", 400);
  }
 
  const product = await model.product.findByIdAndUpdate(
    id,
    updateData, 
   { new: true, runValidators: true }
  );

  if (!product) {
    throw new ApplicationError("Product not found", 404);
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
  if (filters.category) query.category = filters.category;

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price$lte = Number(filters.maxPrice);
  };

  if (filters.size) query.size = filters.size;
  return await model.product.find(query);
};



export const rateProduct = async (userId, productId, rating) => {
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApplicationError("Invalid User or Product ID", 400);
  }
 
  const product = await model.product.findById(productId);
  if (!product) throw new ApplicationError("Product not found", 404);
  
  if (!product.ratings) {
    product.ratings = [];
  }
  const existingRatingIndex = product.ratings.findIndex(
    (r) => r.userId.equals(userId)
  );

  if (existingRatingIndex >= 0) {
    product.ratings[existingRatingIndex].rating = rating;
  } else {
    product.ratings.push({ userId, rating });

  }
  await product.save();
  return product;
};

export const bulkCreateService = async (productArray) => {
  const bulkAddProducts = await model.product.insertMany(productArray);
  return bulkAddProducts;
};
