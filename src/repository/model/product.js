import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    image: {
        type:String
        // data: Buffer,
        // contentType: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    size: {
        type:[String] 
    },
    ratings: {
        type: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                    required: true
                },
                rating: {
                    type: Number,
                    min: 1,
                    max:5,
                    required: true
                }
            }
            
        ],
        default: []
       
    }

   
},{
    timestamps: true,
    versionKey: false
});


const productModel = mongoose.model('product', productSchema)
export default productModel;