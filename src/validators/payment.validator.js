import { body, param } from "express-validator";


//==================================================
// CREATE PAYMENT
//==================================================

export const createPaymentValidator = [

    body("orderId")
        .isMongoId()
        .withMessage("Invalid order ID"),

    body("paymentMethod")
        .trim()
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn([
            "UPI",
            "CARD",
            "NET_BANKING",
            "WALLET",
            "COD"
        ])
        .withMessage("Invalid payment method")

];


//==================================================
// VERIFY PAYMENT
//==================================================

export const verifyPaymentValidator = [

    body("razorpayOrderId")
        .trim()
        .notEmpty()
        .withMessage("Razorpay order ID is required"),

    body("razorpayPaymentId")
        .trim()
        .notEmpty()
        .withMessage("Razorpay payment ID is required"),

    body("razorpaySignature")
        .trim()
        .notEmpty()
        .withMessage("Razorpay signature is required")

];


//==================================================
// GET PAYMENT BY ORDER
//==================================================

export const paymentOrderIdValidator = [

    param("orderId")
        .isMongoId()
        .withMessage("Invalid order ID")

];


//==================================================
// PAYMENT ID VALIDATOR
//==================================================

export const paymentIdValidator = [

    param("paymentId")
        .isMongoId()
        .withMessage("Invalid payment ID")

];