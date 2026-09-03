import crypto from "crypto";

import paymentRepository from "../repository/payment.repository.js";
import orderRepository from "../repository/order.repository.js";
import razorpay from "../config/razorpay.config.js";
import appConfig from "../config/app.config.js";

import { ApplicationError } from "../errors/index.js";


class PaymentService {

    constructor() {

        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;

    }


    //========================================================
    // CREATE PAYMENT
    //========================================================

    async createPayment(userId, orderId, paymentMethod) {

        // 1. Verify order

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


        // 2. Check whether payment already exists

        const existingPayment =
            await this.paymentRepository.findByOrderId(
                orderId
            );

        if (existingPayment) {

            throw new ApplicationError(
                "Payment already exists for this order"
            );

        }


        // 3. Convert total amount into paise

        const amountInPaise =
            Math.round(order.totalAmount * 100);


        // 4. Create Razorpay order

        const razorpayOrder =
            await razorpay.orders.create({

                amount: amountInPaise,

                currency: "INR",

                receipt: orderId.toString()

            });


        // 5. Create payment in MongoDB

        const payment =
            await this.paymentRepository.create({

                userId,

                orderId,

                amount: order.totalAmount,

                currency: "INR",

                paymentMethod,

                status: "PENDING",

                gateway: "RAZORPAY",

                gatewayOrderId: razorpayOrder.id

            });


        // 6. Return payment details

        return {

            payment,

            razorpayOrder: {

                id: razorpayOrder.id,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency

            }

        };

    }


    //========================================================
    // VERIFY PAYMENT
    //========================================================

    async verifyPayment(
        userId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
    ) {

        // 1. Find payment using Razorpay Order ID

        const payment =
            await this.paymentRepository.findByGatewayOrderId(
                razorpayOrderId
            );

        if (!payment) {

            throw new ApplicationError(
                "Payment not found"
            );

        }


        // 2. Verify payment belongs to logged-in user

        if (
            payment.userId.toString() !==
            userId.toString()
        ) {

            throw new ApplicationError(
                "Unauthorized payment"
            );

        }


        // 3. Generate signature on server

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    appConfig.razorpay.key_secret
                )
                .update(
                    `${razorpayOrderId}|${razorpayPaymentId}`
                )
                .digest("hex");


        // 4. Compare signatures

        if (
            generatedSignature !==
            razorpaySignature
        ) {

            await this.paymentRepository.updatePaymentStatus(
                payment._id,
                "FAILED"
            );

            throw new ApplicationError(
                "Payment verification failed"
            );

        }


        // 5. Save Razorpay payment ID

        const updatedPayment =
            await this.paymentRepository.updateGatewayDetails(
                payment._id,
                razorpayOrderId,
                razorpayPaymentId
            );


        // 6. Update payment status

        const successPayment =
            await this.paymentRepository.updatePaymentStatus(
                updatedPayment._id,
                "SUCCESS"
            );

         await this.orderRepository.updatePaymentStatus(
            payment.orderId,
            "PAID"
         );


        return successPayment;

    }


    //========================================================
    // GET PAYMENT BY ORDER
    //========================================================

    async getPaymentByOrder(userId, orderId) {

        // 1. Verify order belongs to user

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


        // 2. Find payment

        const payment =
            await this.paymentRepository.findByOrderId(
                orderId
            );

        if (!payment) {

            throw new ApplicationError(
                "Payment not found"
            );

        }


        return payment;

    }


    //========================================================
    // GET USER PAYMENTS
    //========================================================

    async getUserPayments(userId) {

        return await this.paymentRepository.findByUserId(
            userId
        );

    }


    //========================================================
    // GET PAYMENT BY ID
    //========================================================

    async getPaymentById(userId, paymentId) {

        const payment =
            await this.paymentRepository.findById(
                paymentId
            );

        if (!payment) {

            throw new ApplicationError(
                "Payment not found"
            );

        }


        // Verify payment belongs to user

        if (
            payment.userId.toString() !==
            userId.toString()
        ) {

            throw new ApplicationError(
                "Unauthorized payment access"
            );

        }


        return payment;

    }

}


export default new PaymentService();