
import BaseRepository from "./base.repository.js";
import orderModel from "./models/order.model.js";


class OrderRepository extends BaseRepository {

    constructor() {
        super(orderModel);
    }


    //------------------------------------------------------------------
    // Find all orders of a user
    //------------------------------------------------------------------

    async findByUser(userId) {

        return this.model
            .find({ userId })
            .populate("items.productId");
    }

    //------------------------------------------------------------------
    // Find a specific order of a user
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
    // Update order status
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
}


export default new OrderRepository();

