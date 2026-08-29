import { body, param } from "express-validator";

export const createPaymentValidator = [
    body("orderId")
        .isMongoId()
        .withMessage("Invalid order ID"),

    body("paymentMethod")
        .trim()
        .notEmpty()
        .withMessage("Payment method is required")
];

export const paymentOrderIdValidator = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid order ID")
];

export const updatePaymentStatusValidator = [
    param("paymentId")
        .isMongoId()
        .withMessage("Invalid payment ID"),

    body("paymentStatus")
        .isIn([
            "pending",
            "processing",
            "success",
            "failed"
        ])
        .withMessage("Invalid payment status")
];