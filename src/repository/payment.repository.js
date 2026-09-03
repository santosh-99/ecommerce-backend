import BaseRepository from "./base.repository.js";
import payment from "./models/payment.model.js";


class PaymentRepository extends BaseRepository {

    constructor() {
        super(payment);
    }


    //===============================================
    // FIND PAYMENT BY ORDER
    //===============================================

    async findByOrderId(orderId) {

        return this.model.findOne({
            orderId
        });
    }


    //===============================================
    // FIND PAYMENS BY USERID
    //===============================================

    async findByUserId(userId) {

        return this.model
            .find({ userId })
            .sort({ createdAt: -1 });

    }


    //===============================================
    // UPDATE PAYMENT STATUS
    //===============================================

    async updatePaymentStatus(paymentId, status) {
        return this.model.findByIdAndUpdate(
            paymentId,
            {
                status
            },
            {
                new: true,
                runValidators: true

            }
        );
    }

    //===============================================
    // UPDATE GATEWAY DETAILS
    //===============================================

    async updateGatewayDetails(
        paymentId,
        gatewayOrderId,
        gatewayPaymentId

    ) {

        return this.model.findByIdAndUpdate(
            paymentId,
            {
                gatewayOrderId,
                gatewayPaymentId
            },
            {
                new: true,
                runValidators: true

            }
        );

    }

    //===============================================
    // FIND PAYMENT BY GATEWAY ORDER ID
    //===============================================

    async findByGatewayOrderId(gatewayOrderId) {
        return this.model.findOne({
            gatewayOrderId
        });
      }

    //===============================================
    // FIND PAYMENT BY GATEWAY PAYMENT ID
    //===============================================
    async findByGatewayPaymentId(gatewayPaymentId) {

        return this.model.findOne(
            {
                gatewayPaymentId
            }
        );
    }


}


export default new PaymentRepository();
