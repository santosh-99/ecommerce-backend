import model from "../../repository/index.js";
import { ApplicationError } from "../../utils/applicationError.js";
import mongoose from "mongoose";

export const addcartItem = async (userId, productId, quantity) => {
  const existingItem = await model.cart.findOne({ userId, productId });
    if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
    return existingItem;
  }
  const newItem = await model.cart.create({ userId, productId, quantity });
  return newItem;
};
export const allCartProducts = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid UserId", 400);
  }
  const cartItems = await model.cart.find({ userId }).populate("productId");
  return cartItems;
};
export const updateCart = async (userId, productId, quantity) => {
  const existingItem = await model.cart.findOne({ userId, productId });
  if (!existingItem) {
    throw new ApplicationError("CartItem not found", 400);
  }
  existingItem.quantity = quantity;
  await existingItem.save();
  return existingItem;
};
export const removeCartItem = async (userId, productId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid UserId", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApplicationError("Invalid ProductId", 400);
  }
  const deletedItem = await model.cart.findOneAndDelete({ userId, productId });
  if (!deletedItem) {
    throw new ApplicationError("CartItem not found", 404);
  }
  return deletedItem;
};
