import mongoose from "mongoose";
import { ApplicationError } from "../../utils/applicationError.js";
import model from "../../repository/index.js";

export const createPaymentService = async (orderId, userId, paymentMethod) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApplicationError("Invalid orderId", 400);
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid userId", 400);
  }

  const order = await model.order.findById(orderId);
  if (!order) {
    throw new ApplicationError("Order not found", 404);
  }
  console.log("service order:", order);
  if (order.userId.toString() !== userId) {
    throw new ApplicationError(
      "Unauthorized: Order does not belong to this user",
      403,
    );
  }

  if (order.paymentStatus === "paid") {
    throw new ApplicationError("Payment already processed for this order", 400);
  }

  const payment = await model.payment.create({
    orderId,
    userId,
    amount: order.totalAmount,
    paymentMethod,
    status: "pending",
    transactionId: `TXN_${Date.now()}_${orderId}`,
  });
  console.log("service payment:", payment);
  return payment;
};

export const processPaymentService = async (paymentId, paymentDetails) => {
  if (!mongoose.Types.ObjectId.isValid(paymentId)) {
    throw new ApplicationError("Invalid paymentId", 400);
  }

  const payment = await model.payment.findById(paymentId);
  if (!payment) {
    throw new ApplicationError("Payment not found", 404);
  }

  if (payment.status !== "pending") {
    throw new ApplicationError("Payment has already been processed", 400);
  }

  try {
    // Simulate payment processing
    // In production, integrate with actual payment gateway (Stripe, PayPal, etc.)
    payment.status = "completed";
    payment.processedAt = new Date();
    payment.paymentDetails = paymentDetails;
    await payment.save();

    // Update order payment status
    await model.order.findByIdAndUpdate(
      payment.orderId,
      { paymentStatus: "paid" },
      { new: true },
    );

    return payment;
  } catch (error) {
    payment.status = "failed";
    payment.failureReason = error.message;
    await payment.save();
    throw new ApplicationError("Payment processing failed", 500);
  }
};

export const getPaymentService = async (paymentId) => {
  if (!mongoose.Types.ObjectId.isValid(paymentId)) {
    throw new ApplicationError("Invalid paymentId", 400);
  }

  const payment = await model.payment.findById(paymentId);
  if (!payment) {
    throw new ApplicationError("Payment not found", 404);
  }

  return payment;
};

export const getPaymentByOrderService = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApplicationError("Invalid orderId", 400);
  }

  const payment = await model.payment.findOne({ orderId });
  if (!payment) {
    throw new ApplicationError("Payment not found for this order", 404);
  }

  return payment;
};

export const getUserPaymentsService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApplicationError("Invalid userId", 400);
  }

  const payments = await model.payment.find({ userId }).sort({ createdAt: -1 });
  return payments;
};

export const refundPaymentService = async (paymentId) => {
  if (!mongoose.Types.ObjectId.isValid(paymentId)) {
    throw new ApplicationError("Invalid paymentId", 400);
  }

  const payment = await model.payment.findById(paymentId);
  if (!payment) {
    throw new ApplicationError("Payment not found", 404);
  }

  if (payment.status !== "completed") {
    throw new ApplicationError("Only completed payments can be refunded", 400);
  }

  payment.status = "refunded";
  payment.processedAt = new Date();
  await payment.save();

  // Update order payment status
  await model.order.findByIdAndUpdate(
    payment.orderId,
    { paymentStatus: "pending" },
    { new: true },
  );

  return payment;
};
