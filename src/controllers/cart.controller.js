import cartService from "../services/cart.service.js";

class CartController {

    constructor() {
        this.cartService = cartService;
    }


    // ============================================================
    // Add product to cart
    // ============================================================

    addToCart = async (req, res, next) => {

        try {

            const userId = req.user.userId;

            const {
                productId,
                quantity
            } = req.body;


            const cartItem =
                await this.cartService.addToCart(
                    userId,
                    productId,
                    quantity
                );


            res.status(201).json({
                success: true,
                message: "Product added to cart successfully",
                data: cartItem
            });

        } catch (error) {

            next(error);
        }
    };


    // ============================================================
    // Get user's cart
    // ============================================================


    getCart = async (req, res, next) => {

        try {

            const userId = req.user.userId;



            const cartItems =
                await this.cartService.getCart(userId);


            res.status(200).json({
                success: true,
                message: "Cart fetched successfully",
                data: cartItems
            });

        } catch (error) {

            next(error);
        }
    };


    // ============================================================
    // Update cart item quantity
    // ============================================================


    updateCartItem = async (req, res, next) => {

        try {

            const userId = req.user.userId;

            const {
                productId
            } = req.params;

            const {
                quantity
            } = req.body;




            const cartItem =
                await this.cartService.updateCartItem(
                    userId,
                    productId,
                    quantity
                );


            res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                data: cartItem
            });

        } catch (error) {

            next(error);
        }
    };


    // ============================================================
    // Remove product from cart
    // ============================================================


    removeFromCart = async (req, res, next) => {

        try {

            const userId = req.user.userId;

            const {
                productId
            } = req.params;


       
            const cartItem =
                await this.cartService.removeFromCart(
                    userId,
                    productId
                );


            res.status(200).json({
                success: true,
                message: "Product removed from cart successfully",
                data: cartItem
            });

        } catch (error) {

            next(error);
        }
    };
}

export default new CartController();