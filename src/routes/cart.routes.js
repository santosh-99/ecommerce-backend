import express from "express";
import cartController from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";
import {
    addToCartValidator,
    updateCartValidator,
    cartProductIdValidator
} from "../validators/cart.validators.js";
import validateRequest from "../middlewares/validate-req-middleware.js";

const router = express.Router();

//=========================================================
// 1.ADD TO CART
//=========================================================
router.post(
    "/",
    authMiddleware,
    addToCartValidator,
    validateRequest,
    cartController.addToCart
);

//=========================================================
// 2.GET CART ITEMS
//=========================================================
router.get(
    "/",
    authMiddleware,
    cartController.getCart
);

//=========================================================
// 3.UPDATE CART
//=========================================================
router.patch(
    "/:productId",
    authMiddleware,
    updateCartValidator,
    validateRequest,
    cartController.updateCartItem
);

//=========================================================
// 4.DELETE CART ITEM
//=========================================================
router.delete(
    "/:productId",
    authMiddleware,
    cartProductIdValidator,
    validateRequest,
    cartController.removeFromCart
);

export default router;