import service from "../../service/index.js";

export const initiatePayment = async (req, res, next) => {
    try {
        
        const { orderId, userId, paymentMethod, paymentGateway } = req.body;
        console.log("orderId:", orderId)
        console.log("userId:", userId)
        console.log("paymentMethod:", paymentMethod)
        console.log("paymentGateway:", paymentGateway)

        if (!orderId || !userId || !paymentMethod || !paymentGateway) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: orderId, userId, paymentMethod, paymentGateway"
            });
        }

        const payment = await service.payment.createPaymentService(orderId, userId, paymentMethod, paymentGateway);

        res.status(201).json({
            success: true,
            message: "Payment initiated successfully",
            data: payment
        });
    } catch (err) {
        console.log("Error in initiatePayment:", err);
        next(err);
    }
};

export const processPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const { gatewayResponse } = req.body;

        if (!gatewayResponse) {
            return res.status(400).json({
                success: false,
                message: "gatewayResponse is required"
            });
        }

        const payment = await service.payment.processPaymentService(paymentId, gatewayResponse);

        res.status(200).json({
            success: true,
            message: "Payment processed successfully",
            data: payment
        });
    } catch (err) {
        console.log("Error in processPayment:", err);
        next(err);
    }
};

export const getPaymentById = async (req, res, next) => {
    try {
        const { paymentId } = req.params;

        const payment = await service.payment.getPaymentByIdService(paymentId);

        res.status(200).json({
            success: true,
            data: payment
        });
    } catch (err) {
        console.log("Error in getPaymentById:", err);
        next(err);
    }
};

export const getPaymentsByOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const payments = await service.payment.getPaymentsByOrderService(orderId);

        res.status(200).json({
            success: true,
            data: payments
        });
    } catch (err) {
        console.log("Error in getPaymentsByOrder:", err);
        next(err);
    }
};

export const getPaymentsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const payments = await service.payment.getPaymentsByUserService(userId);

        res.status(200).json({
            success: true,
            data: payments
        });
    } catch (err) {
        console.log("Error in getPaymentsByUser:", err);
        next(err);
    }
};

export const refundPayment = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const { refundAmount, refundReason } = req.body;

        if (!refundAmount || !refundReason) {
            return res.status(400).json({
                success: false,
                message: "refundAmount and refundReason are required"
            });
        }

        const payment = await service.payment.refundPaymentService(paymentId, refundAmount, refundReason);

        res.status(200).json({
            success: true,
            message: "Payment refunded successfully",
            data: payment
        });
    } catch (err) {
        console.log("Error in refundPayment:", err);
        next(err);
    }
};
