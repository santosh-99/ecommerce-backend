import paymentRepository from "../repository/payment.repository.js";
import orderRepository from  "../repository/payment.repository.js";
import { ApplicationError } from "../errors/index.js";

class PaymentService {
    constructor() {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }


    //create payment for an order
    async cratePayment(userId, orderId, paymentMethod) {
        //1. check wether order belongs to user
        const order =
        await this.orderRepository.findByUserAndOrder(userId, orderId);

        if(!order) {
            throw new ApplicationError(
                "Order not found"
            );
        }

        //2.check wether payment alreday exists
        const existingPayment = await this.paymentRepository.findByOrderId(orderId);

        if(existingPayment) {
            throw new ApplicationError(
                "Payment alreday exists for this order"
            );
        }
        //3.create Payment
        const payment =
        await this.paymentReposistory.create({
            userId,
            orderId,
            amount:order.totalAmount,
            paymentStatus:"pending"
        });
        return payment;

    }


    //get payment by order

    async getPayementByOrder(userId, orderId) {
        //verify order belong to user
        const order =
        await this.orderRepository.findByUserAndOrder(
            userId,
            orderId
        );

        if(!order) {
            throw new ApplicationError(
                "order not found"
            );
        }
        const payment =
        await this.paymentRepository.findByOrderId(
            orderId
        );
        if(!payment) {
            throw new ApplicationError(
                "Payment not found"
            );

            return payment;
        }


    }

    //get user's payments
    async getUserPayments(userId) {
        return await this.paymentRepository.findByUserId(
            userId
        );
    }

    //update payment status
    async updatePaymentStatus(userId, paymentId, paymentStatus) {
        const payment = await this.paymentRepository.findById(paymentId);

        if(!payment) {
            throw new ApplicationError("Payment not found");

        }

        //make sure payemnt belongs to logged in user

        if(
            payment.userId.toString() !== userId.toString()
        ){
            throw new ApplicationError(
                "Unauthorized Payment access"
            );
        }

        return await this.paymentRepository.updatePaymentStatus(
        paymentId,
        paymentStatus
        );

    }

}

export default new PaymentService();