import mongoose from  "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
            required: true,
            index: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            index: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: "INR",
            uppercase: true,
            trim: true

        },

        paymentMethod: {
            type: String,
            enum: [
                "UPI",
                "CARD",
                "NET_BANKING",
                "WALLET",
                "COD"
            ],
            required: true

        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "PROCESSING",
                "SUCCESS",
                "FAILED",
                "CANCELLED",
                "REFUNDED"
            ],

            default: "PENDING",
            index: true
        },

        transactionId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        gateway: {
            type: String,
            enum: [
                "RAZORPAY",
                "STRIPE",
                "COD",
                "OTHER"
            ]
        },

        gatewayOrderId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        gatewayPaymentId: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        failureReason: {
            type: String,
            trim: true
        },

        refundId: {
            type: String,
            trim: true
        },

        refundedAmount: {
            type: Number,
            min: 0,
            default: 0
        },

        processedAt: {
            type: Date
        }

    },
    {
        timestamps: true,
        versionkey: false
    }
);


const payment = mongoose.model("payment", paymentSchema);

export default payment;