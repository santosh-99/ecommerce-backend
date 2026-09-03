
import BaseRepository from "./base.repository.js";
import orderModel from "./models/order.model.js";


class OrderRepository extends BaseRepository {

    constructor() {
        super(orderModel);
    }


    //------------------------------------------------------------------
    // GET  ORDERS
    //------------------------------------------------------------------

    async findByUser(userId) {

        return this.model
            .find({ userId })
            .populate("items.productId");
    }

    //------------------------------------------------------------------
    //  FIND ORDER OF A USER
    //------------------------------------------------------------------

    async findByUserAndOrder(userId, orderId) {

        return this.model
            .findOne({
                _id: orderId,
                userId,
            })
            .populate("items.productId");
    }

    //------------------------------------------------------------------
    // UPDATE ORDER STATUS
    //------------------------------------------------------------------

    async updateStatus(orderId, status) {

        return this.model.findByIdAndUpdate(
            orderId,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );
    }

    //========================================================
    // UPDATE PAYMENT STATUS
    //========================================================

     async updatePaymentStatus(orderId, paymentStatus) {

        return this.model.findByIdAndUpdate(
            orderId,
            { paymentStatus },
            {
                new : true,
                runValidators: true,

            }
        );
     }

}


export default new OrderRepository();

