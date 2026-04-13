import express from "express";
import controller from "../../controller/index.js";

const router = express.Router();
router.post('/:userId', controller.cart.addToCart);
router.get('/:userId', controller.cart.cartItems)
router.put('/:userId', controller.cart.updateCartItems)
router.delete('/:userId', controller.cart.removeFromCart)

export default router;