import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    items: [
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            quantity:{
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true,
    
            },

        }

    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enmu:['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
        required: true
    },
    paymentStatus:{
        type: String,
        enmu:['pending', 'paid', 'failed'],
        default: 'pending'
    },
   

},{timestamps: false,
    versionKey:false,

});

const orderModel = mongoose.model('order', orderSchema)

export default orderModel;