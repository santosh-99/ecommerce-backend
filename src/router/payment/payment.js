import express from "express";
import controller from "../../controller/index.js";

const router = express.Router();

// Initiate a new payment for an order
router.post("/initiate", controller.payment.initiatePayment);

// Get all payments for an order (specific routes before generic)
router.get("/order/:orderId", controller.payment.getPaymentsByOrder);

// Get all payments by a user
router.get("/user/:userId", controller.payment.getPaymentsByUser);

// Process payment (confirm payment from gateway)
router.post("/:paymentId/process", controller.payment.processPayment);

// Refund a payment
router.post("/:paymentId/refund", controller.payment.refundPayment);

// Get payment details by payment ID (generic route last)
router.get("/:paymentId", controller.payment.getPaymentById);

export default router;
