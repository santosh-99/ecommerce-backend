import paymentService from "../services/payment.service.js";

class PaymentController {

    constructor() {

        this.paymentService = paymentService;

    }

    //===================================================
    // CREATE PAYMENT
    //===================================================

    createPayment = async(req, res, next)  => {

        try {

            const userId = req.user.userId;

            const {
                orderId,
                paymentMethod
            } = req.body;

            const payment = await this.paymentService.createPayment(userId, orderId, paymentMethod);

            return res.status(201).json({
                success: true,

                message: "payment created successfully",

                data: payment
            });


        } catch (error) {

            next(error);
        }

    }

    //===================================================
    // VERIFY PAYMENT
    //===================================================
     verifyPayment = async (req, res, next) => {

        try {
            const userId = req.user.userId;

            const {
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature
            } = req.body;


            const payment  =
            await this.paymentService.verifyPayment(

                userId,
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature
            );

            return res.status(200).json({

                success: true,

                message: "Payment verified successfully",

                data: payment
            });

        } catch(error) {

            next(error);
        }
     };

    //===================================================
    // GET PAYMENT BY ORDER
    //===================================================

        getPaymentByOrder = async(req, res, next)  => {

        try {
            const  userId = req.user.userId;

            const { orderId } = req.params;

            const payment =
            await this.paymentService.getPaymentByOrder(
                userId,
                orderId
            );

            return res.status(200).json({
                success: true,
                data: payment
            });

        } catch (error) {

            next(error);
        }
    }

    //===================================================
    // GET LOGGED-IN USER PAYMENTS
    //===================================================

     getUserPayments = async (req, res, next) => {

        try {
            const userId = req.user.userId;

            const payments =
            await this.paymentService.getUserPayments(
                userId
            );

            return res.status(200).json({
                success: true,
                data: payments
            });
        } catch (error) {
            next(error);
        }
    }

    //===================================================
    // CREATE PAYMENT BY ID
    //===================================================

     getPaymentById = async (req, res, next)  => {

        try {
            const userId = req.user.userId;

            const { paymentId } = req.params;

            const payment =
            await this.paymentService.getPaymentById(
                userId,
                paymentId
            );

            return res.status(200).json({
                success: true,
                data: payment
            });

        } catch (error) {
            
            next(error);
        }
    }

}

export default new PaymentController();