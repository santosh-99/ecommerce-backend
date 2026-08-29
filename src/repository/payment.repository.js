import BaseRepository from  "./base.repository.js";
import paymentModel from "./models/payment.model.js";


class PaymentRepository extends BaseRepository {
    constructor() {
        super(paymentModel);
    }

    async findByOrderId(orderId) {
        return this.model.findOne({orderId});
    }

    async findByUserId(userId) {
        return this.model.find({userId});
    }

    async updatedPaymentStatus(paymentId, paymentStatus) {
        return this.model.findByIdAndUpdate(paymentId, {paymentStatus}, {
            new:true,
            runValidatros:true
        });
    }
}

export default new PaymentRepository();