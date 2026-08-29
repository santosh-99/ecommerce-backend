import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true
    },
    paymentDetails: {
        cardLast4: String,
        cardBrand: String,
        paypalEmail: String,
        bankName: String
    },
    failureReason: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    processedAt: Date
}, { timestamps: true });

const payment = mongoose.model('payment', paymentSchema);
export default payment;
