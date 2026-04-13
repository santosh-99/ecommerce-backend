import mongoose from "mongoose";
import { ApplicationError } from "../../utils/applicationError.js";
import model from "../../repository/index.js";

export const createOrderService = async (userId, address) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid UserId", 400);
  }
  const cartItems = await model.cart.find({ userId });
  if (cartItems.length === 0) {
    throw new ApplicationError("Cart is empty", 400);
  }
  let totalAmount = 0;
  const items = [];
  for (let item of cartItems) {
    const product = await model.product.findById(item.productId);
    if (!product) {
      throw new ApplicationError("Product not found", 404);
    }
    totalAmount += product.price * item.quantity;
    items.push({
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    });
  }
  const order = await model.order.create({
    userId,
    items,
    totalAmount,
    address,
    status: "pending",
    paymentStatus: "pending",
  });
  await model.cart.deleteMany({ userId });
  return order;
};
export const getUserOrderService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid UserId", 400);
  }
  const orders = await model.order.find({ userId });
  return orders;
};
export const singleOrderService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApplicationError("Invalid orderId", 400);
  }

  const order = await model.order.findById({ orderId });
  if (!order) {
    throw new ApplicationError("No orer found", 404);
  }
  return order;
};
export const cancelOrderService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApplicationError("Invalid OrderId", 400);
  }
  const cancelledOrder = await model.order.findByIdAndDelete({ orderId });
  if (!cancelledOrder) {
    throw new ApplicationError("No order found", 404);
  }
  cancelledOrder.status = "cancelled";
  cancelledOrder.save();
  return cancelledOrder;
};
