import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

cartSchema.index(
    { userId: 1, productId: 1 },
    { unique: true }
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;