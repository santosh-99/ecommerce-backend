
import orderRepository from "../repository/order.repository.js";
import cartRepository from "../repository/cart.repository.js";
import { ApplicationError } from "../errors/index.js";


class OrderService {

    constructor() {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    //---------------------------------------------------------------
    // CREATE ORDER
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
                status: "PENDING",
                paymentStatus: "PENDING"
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
    // GET ORDERS
    //---------------------------------------------------------------
    async getUserOrders(userId) {

        return await this.orderRepository.findByUser(
            userId
        );
    }

    //---------------------------------------------------------------
    // GET ORDER BY USER
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
    // CANCEL ORDER
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


        if (order.status !== "PENDING") {
            throw new ApplicationError(
                "Order cannot be cancelled"
            );
        }


        return await this.orderRepository.updateStatus(
            orderId,
            "CANCELLED"
        );
    }
}


export default new OrderService();

