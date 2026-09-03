import { Router } from "express";

import paymentController from "../controllers/payment.controller.js";

import authMiddleware from "../middlewares/auth.Middleware.js";

import {
    createPaymentValidator,
    paymentOrderIdValidator,
    paymentIdValidator,
    verifyPaymentValidator
} from "../validators/payment.validator.js";

import validateRequest from "../middlewares/validate-req-middleware.js";


const router = Router();


//===========================================================
// 1. CREATE PAYMENT
//===========================================================

router.post(
    "/",
    authMiddleware,
    createPaymentValidator,
    validateRequest,
    paymentController.createPayment
);


//===========================================================
// 2. VERIFY PAYMENT
//===========================================================

router.post(
    "/verify",
    authMiddleware,
    verifyPaymentValidator,
    validateRequest,
    paymentController.verifyPayment
);


//===========================================================
// 3. GET LOGGED-IN USER PAYMENTS
//===========================================================

router.get(
    "/",
    authMiddleware,
    paymentController.getUserPayments
);


//===========================================================
// 4. GET PAYMENT BY ORDER
//===========================================================

router.get(
    "/order/:orderId",
    authMiddleware,
    paymentOrderIdValidator,
    validateRequest,
    paymentController.getPaymentByOrder
);


//===========================================================
// 5. GET PAYMENT BY ID
//===========================================================

router.get(
    "/:paymentId",
    authMiddleware,
    paymentIdValidator,
    validateRequest,
    paymentController.getPaymentById
);


export default router;