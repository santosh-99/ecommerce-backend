import { body, param } from "express-validator";


// ============================================================
// ADD PRODUCT TO CART
// ============================================================

export const addToCartValidator = [

    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")

        .isMongoId()
        .withMessage("Invalid product ID"),


    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")

        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")

        .toInt()

];


// ============================================================
// UPDATE CART ITEM QUANTITY
// ============================================================

export const updateCartValidator = [

    param("productId")
        .notEmpty()
        .withMessage("Product ID is required")

        .isMongoId()
        .withMessage("Invalid product ID"),


    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")

        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")

        .toInt()

];


// ============================================================
// REMOVE CART ITEM
// ============================================================

export const cartProductIdValidator = [

    param("productId")
        .notEmpty()
        .withMessage("Product ID is required")

        .isMongoId()
        .withMessage("Invalid product ID")

];

