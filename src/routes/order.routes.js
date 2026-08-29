
import { Router } from "express";

import orderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

import {
    orderIdValidator
} from "../validators/order.validator.js";

import validateRequest from "../middlewares/validate-req-middleware.js";


const router = Router();

//------------------------------------------------------------------
// Create order from cart
//------------------------------------------------------------------

router.post(
    "/",
    authMiddleware,
    orderController.createOrder
);

//------------------------------------------------------------------
// Get logged-in user's orders
//------------------------------------------------------------------

router.get(
    "/",
    authMiddleware,
    orderController.getUserOrders
);

//------------------------------------------------------------------
// Get single order
//------------------------------------------------------------------

router.get(
    "/:orderId",
    authMiddleware,
    orderIdValidator,
    validateRequest,
    orderController.getOrderById
);

//------------------------------------------------------------------
// Cancel order
//------------------------------------------------------------------

router.patch(
    "/:orderId/cancel",
    authMiddleware,
    orderIdValidator,
    validateRequest,
    orderController.cancelOrder
);


export default router;
