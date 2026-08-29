import paymentService from "../services/payment.service.js";

class PaymentController {
    constructor() {
        this.paymentService = paymentService;
    }

    //create payment

    async createPayment(req, res, next){
        try{
            const userId = req.user.userId;

            const {
                orderId,
                paymentMethod
            } = req.body;

            const payment =
            await this.paymentService.createPayment(
                userId,
                orderId,
                paymentMethod
            );
            res.status(201).json({
                success:true,
                message:"Payment created successfully",
                data:payment
            });

        }catch(error) {
            next(error)
        }
    }

    // Get payment by order
    async getPaymentByOrder(req, res, next) {
        try {
            const userId = req.user.userId;
            const { orderId } = req.params;

            const payment =
            await this.paymentService.getPaymentByOrder(
                userId,
                orderId
            );
            res.status(200).json({
                success:true,
                data:payment
            });

        }catch(error) {
            next(error);
        }
    }

    //get Logged-in user's payments
    async getUserPayments(req, res, next) {
        try {
            const userId = req.user.userId;
            const payments =
            await this.paymentService.getUserPayments(
                userId
            );
            res.status(200).json({
                success: true,
                data:payments
            });

        }catch(err) {
            next(err);
        }
    }

    //update payment status
    async updatePaymentStatus(req, res, next) {
        try {
            const userId = req.user.userId;
            const { paymentId } = req.params;
            const { paymentStatus } = req.body;

            const payment =
            await this.paymentService.updatePaymentStatus(
                userId,
                paymentId,
                paymentStatus
            );
            res.status(200).json({
                success: true,
                message: "Payment status updated successfully",
                data: payment
            });

        } catch(err) {
            next(err)
        }
    }
}


export default new PaymentController();