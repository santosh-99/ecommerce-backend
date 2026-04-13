import service from "../../service/index.js";

export const addToCart = async(req, res, next) => {
    const  userId = req.params.userId;
    const {productId, quantity} = req.body;
    try {
        const cartItem = await service.cart.addcartItem(userId, productId, quantity);
        res.status(201).json({
           message :"Cart Updated",
            data: cartItem
        })

    } catch (err) {
        next(err)
    }


}
export const cartItems = async(req, res, next) => {
    
    try {
        const userId = req.params.userId;
        const cartItems = await service.cart.allCartProducts(userId);
        res.status(200).json({
            success: true,
            data: cartItems
        })

    } catch (err) {
        next(err)
    }


}
export const updateCartItems = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const {productId, quantity} = req.body;

        const updatedCart = await service.cart.updateCart(userId, productId, quantity);
        res.status(200).json({
            success: true,
            data: updatedCart
        })
    } catch (err) {
        next(err);
    }

}
export const removeFromCart = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const {productId} = req.body;
        const deletedItem = await service.cart.removeCartItem(userId, productId);
        res.status(200).json({
            sussess: true,
            message: "Cart item deleted succssfully!"
        })
        
    } catch (err) {
        next(err);
    }


}
