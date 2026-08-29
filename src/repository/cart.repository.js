import BaseRepository from "./base.repository.js";
import cartModel from "./models/cart.model.js";

class CartRepository extends BaseRepository {

    constructor() {
        super(cartModel);
    }


    // ============================================================
    // GET ALL CART ITEMS OF A USER
    // ============================================================

    async findByUserId(userId) {

        return this.model
            .find({ userId })
            .populate("productId");

    }


    // ============================================================
    // FIND SPECIFIC PRODUCT IN USER'S CART
    // ============================================================

    async findByUserAndProduct(userId, productId) {

        return this.model.findOne({
            userId,
            productId
        });

    }


    // ============================================================
    // UPDATE QUANTITY
    // ============================================================

    async updateQuantity(
        userId,
        productId,
        quantity
    ) {

        return this.model.findOneAndUpdate(

            {
                userId,
                productId
            },

            {
                quantity
            },

            {
                new: true
            }

        );

    }


    // ============================================================
    // DELETE PRODUCT FROM CART
    // ============================================================

    async deleteByUserAndProduct(
        userId,
        productId
    ) {

        return this.model.findOneAndDelete({

            userId,
            productId

        });

    }

}


export default new CartRepository();

