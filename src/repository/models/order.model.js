import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index:true
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        name: {
          type: String,
          required:true,
          trim: true

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

     //==============================================
     // ORDER STATUS
     //==============================================

    status: {
      type: String,

      enum: [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIEVERD",
        "CANCELLED"
      ],

      default: "PENDING",

      required: true,
    },

      //==============================================
     // ORDER PAYMENT STATUS
     //==============================================

    paymentStatus: {

      type: String,

      enum:[
         "PENDING",
         "PAID",
         "FAILED",
         "REFUNDED"
        ],

      default: "PENDING",
    }
  },
  { timestamps: true, versionKey: false },
);

const order = mongoose.model( "order", orderSchema);

export default order;
