import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        name: {
          type: String,
          required:true,


        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min:0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min:0,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enmu: [ "pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    paymentStatus: {
      type: String,
      enmu: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false },
);

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;
