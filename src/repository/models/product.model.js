import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },

        desc: {
            type: String,
            required: [true, "Product description is required"],
            trim: true
        },

        imageUrl: {
            type: String,
            default: null
        },

        image: {
            type: String,
            default: null
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },

        size: {
            type: String,
            trim: true,
            default: "One Size"
        }
    },
    {
        timestamps: true
    }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;