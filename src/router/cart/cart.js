import express from "express";
import controller from "../../controller/index.js";
import jwtMiddleware from "../../middleware/jwtAuthMiddleware.js";

const router = express.Router();
router.use(jwtMiddleware);
router.post('/', controller.cart.addToCart);
router.get('/', controller.cart.cartItems);
router.patch('/:productId', controller.cart.updateCartItems);
router.delete('/:productId', controller.cart.removeFromCart);

export default router;