import cartRepository from "../repository/cart.repository.js";
import productRepository from "../repository/product.repository.js";

import {
    NotFoundError,
    ApplicationError
} from "../errors/index.js";


class CartService {

    constructor() {

        this.cartRepository = cartRepository;
        this.productRepository = productRepository;

    }


    // ============================================================
    // ADD PRODUCT TO CART
    // ============================================================

    async addToCart(
        userId,
        productId,
        quantity
    ) {

        // --------------------------------------------------------
        // 1. Validate quantity
        // --------------------------------------------------------

        if (!Number.isInteger(quantity) || quantity < 1) {

            throw new ApplicationError(
                "Quantity must be at least 1",
                400
            );

        }


        // --------------------------------------------------------
        // 2. Check product exists
        // --------------------------------------------------------

        const product =
            await this.productRepository.findById(
                productId
            );


        if (!product) {

            throw new NotFoundError(
                "Product not found"
            );

        }


        // --------------------------------------------------------
        // 3. Check existing cart item
        // --------------------------------------------------------

        const existingCartItem =
            await this.cartRepository.findByUserAndProduct(
                userId,
                productId
            );


        // --------------------------------------------------------
        // 4. Product already exists
        // --------------------------------------------------------

        if (existingCartItem) {

            const newQuantity =
                existingCartItem.quantity + quantity;


            return await this.cartRepository.updateQuantity(

                userId,

                productId,

                newQuantity

            );

        }


        // --------------------------------------------------------
        // 5. Create new cart item
        // --------------------------------------------------------

        return await this.cartRepository.create({

            userId,

            productId,

            quantity

        });

    }


    // ============================================================
    // GET USER CART
    // ============================================================

    async getCart(userId) {

        return await this.cartRepository.findByUserId(
            userId
        );

    }


    // ============================================================
    // UPDATE CART ITEM QUANTITY
    // ============================================================

    async updateCartItem(
        userId,
        productId,
        quantity
    ) {

        // --------------------------------------------------------
        // Validate quantity
        // --------------------------------------------------------

        if (!Number.isInteger(quantity) || quantity < 1) {

            throw new ApplicationError(
                "Quantity must be at least 1",
                400
            );

        }


        // --------------------------------------------------------
        // Find cart item
        // --------------------------------------------------------

        const cartItem =
            await this.cartRepository.findByUserAndProduct(
                userId,
                productId
            );


        if (!cartItem) {

            throw new NotFoundError(
                "Cart item not found"
            );

        }


        // --------------------------------------------------------
        // Update quantity
        // --------------------------------------------------------

        return await this.cartRepository.updateQuantity(

            userId,

            productId,

            quantity

        );

    }


    // ============================================================
    // REMOVE PRODUCT FROM CART
    // ============================================================

    async removeFromCart(
        userId,
        productId
    ) {

        const cartItem =
            await this.cartRepository.deleteByUserAndProduct(
                userId,
                productId
            );


        if (!cartItem) {

            throw new NotFoundError(
                "Cart item not found"
            );

        }


        return cartItem;

    }

}


export default new CartService();

