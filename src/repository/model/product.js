import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },

    category: {
      type: String,
      enum: ['electronics', 'fashion', 'grocery', 'home', 'others'],
      lowercase: true,
      required: true,
      default: 'electronics',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    size: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((s) => s && s.trim().length > 0);
        },
        message: 'Size cannot be an empty string!',
      },
    },
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const productModel = mongoose.model('product', productSchema);
export default productModel;
