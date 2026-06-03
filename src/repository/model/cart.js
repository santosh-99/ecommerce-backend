import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    quantity: {
        type: Number

    }
}, { timestamps: true,
    versionKey:false,
});

const cartModel  =  mongoose.model('cart', cartSchema)

export default cartModel;