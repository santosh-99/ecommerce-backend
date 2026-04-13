import express from "express";
import controller from "../../controller/index.js";

const router = express.Router();

router.post("/:userId", controller.order.createOrder); // Create order
router.get("/order/user/:userId", controller.order.getUserOrder); // All orders of user
router.get("/order/:orderId", controller.order.singleOrder); // Single order
router.delete("/order/:orderId", controller.order.cancelOrder); // Cancel order

export default router;
