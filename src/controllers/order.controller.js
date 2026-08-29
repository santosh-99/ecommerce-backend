
import orderService from "../services/order.service.js";

class OrderController {

    constructor() {
        this.orderService = orderService;
    }

    // Create order
    async createOrder(req, res, next) {
        try {
            const userId = req.user.userId;
            const { address } = req.body;

            const order =
                await orderService.createOrder(
                    userId,
                    address
                );

            res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: order
            });

        } catch (error) {
            next(error);
        }
    }


    // Get all orders of logged-in user
    async getUserOrders(req, res, next) {
        try {
            const userId = req.user.userId;

            const orders =
                await orderService.getUserOrders(
                    userId
                );

            res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                data: orders
            });

        } catch (error) {
            next(error);
        }
    }


    // Get single order
    async getOrderById(req, res, next) {
        try {
            const userId = req.user.userId;
            const { orderId } = req.params;

            const order =
                await orderService.getOrderById(
                    userId,
                    orderId
                );

            res.status(200).json({
                success: true,
                message: "Order fetched successfully",
                data: order
            });

        } catch (error) {
            next(error);
        }
    }


    // Cancel order
    async cancelOrder(req, res, next) {
        try {
            const userId = req.user.userId;
            const { orderId } = req.params;

            const order =
                await orderService.cancelOrder(
                    userId,
                    orderId
                );

            res.status(200).json({
                success: true,
                message: "Order cancelled successfully",
                data: order
            });

        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();

