
import orderRepository from "../repository/order.repository.js";
import cartRepository from "../repository/cart.repository.js";
import { ApplicationError } from "../errors/index.js";


class OrderService {

    constructor() {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    //---------------------------------------------------------------
    // Create order from cart
    //---------------------------------------------------------------
    async createOrder(userId, address) {

        const cartItems =
            await this.cartRepository.findByUserId(userId);


        if (!cartItems.length) {
            throw new ApplicationError(
                "Cart is empty"
            );
        }


        const orderItems = [];
        let totalAmount = 0;


        for (const cartItem of cartItems) {

            const product = cartItem.productId;


            if (!product) {
                throw new ApplicationError(
                    "Product not found"
                );
            }


            const itemTotal =
                product.price * cartItem.quantity;


            totalAmount += itemTotal;


            orderItems.push({
                productId: product._id,
                name: product.name,
                quantity: cartItem.quantity,
                price: product.price
            });
        }


        const order =
            await this.orderRepository.create({
                userId,
                items: orderItems,
                totalAmount,
                address,
                status: "pending",
                paymentStatus: "pending"
            });


        for (const cartItem of cartItems) {

            await this.cartRepository.deleteByUserAndProduct(
                userId,
                cartItem.productId._id
            );
        }


        return order;
    }

    //---------------------------------------------------------------
    // Get user's orders
    //---------------------------------------------------------------
    async getUserOrders(userId) {

        return await this.orderRepository.findByUser(
            userId
        );
    }

    //---------------------------------------------------------------
    // Get one order
    //---------------------------------------------------------------
    async getOrderById(userId, orderId) {

        const order =
            await this.orderRepository.findByUserAndOrder(
                userId,
                orderId
            );


        if (!order) {
            throw new ApplicationError(
                "Order not found"
            );
        }


        return order;
    }

    //---------------------------------------------------------------
    // Cancel order
    //---------------------------------------------------------------
    async cancelOrder(userId, orderId) {

        const order =
            await this.orderRepository.findByUserAndOrder(
                userId,
                orderId
            );


        if (!order) {
            throw new ApplicationError(
                "Order not found"
            );
        }


        if (order.status !== "pending") {
            throw new ApplicationError(
                "Order cannot be cancelled"
            );
        }


        return await this.orderRepository.updateStatus(
            orderId,
            "cancelled"
        );
    }
}


export default new OrderService();

