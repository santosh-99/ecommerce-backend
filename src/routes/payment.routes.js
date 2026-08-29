import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

import {
    createPaymentValidator,
    paymentOrderIdValidator,
    updatePaymentStatusValidator
} from "../validators/payment.validator.js";

import validateRequest from "../middlewares/validate-req-middleware.js";
const router = Router();

//create payment
router.post("/", authMiddleware,
    createPaymentValidator,
    validateRequest,
    paymentController.createPayment
);


//Get payment by order
router.get(
    "/order/:orderId",
    authMiddleware,
    paymentOrderIdValidator,
    validateRequest,
    paymentController.getPaymentByOrder
);

//update Payment status
router.patch("/:paymentId/status",
    authMiddleware,
    updatePaymentStatusValidator,
    validateRequest,
    paymentController.updatePaymentStatus
);

export default router;