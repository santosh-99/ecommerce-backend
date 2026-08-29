import { Router } from "express";

import productController from "../controllers/product.controller.js";

import {
    createProductValidator,
    updateProductValidator,
    productIdValidator,
    filterProductValidator
} from "../validators/product.validator.js";

import validateRequest from "../middlewares/validate-req-middleware.js";

import uploads from "../middlewares/upload.Middleware.js";

import authMiddleware from "../middlewares/auth.Middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";


const router = Router();


// ============================================================
// PRODUCT ROUTES
// ============================================================


// ============================================================
// 1. CREATE PRODUCT
// ADMIN + SELLER
// ============================================================

router.post(
    "/",

    authMiddleware,

    authorizeRoles(
        "admin",
        "seller"
    ),

    uploads.single("image"),

    createProductValidator,

    validateRequest,

    productController.createProduct
);


// ============================================================
// 2. FILTER PRODUCTS
// ADMIN + SELLER + CUSTOMER
// ============================================================

router.get(
    "/filter",

    authMiddleware,

    authorizeRoles(
        "admin",
        "seller",
        "customer"
    ),

    filterProductValidator,

    validateRequest,

    productController.filterProduct
);


// ============================================================
// 3. GET PRODUCT BY ID
// ADMIN + SELLER + CUSTOMER
// ============================================================

router.get(
    "/:productId",

    productIdValidator,

    validateRequest,

    productController.getProductById
);


// ============================================================
// 4. UPDATE PRODUCT
// ADMIN + SELLER
// ============================================================

router.patch(
    "/:productId",

    authMiddleware,

    authorizeRoles(
        "admin",
        "seller"
    ),

    uploads.single("image"),

    productIdValidator,

    updateProductValidator,

    validateRequest,

    productController.updateProduct
);


// ============================================================
// 5. DELETE PRODUCT
// ADMIN ONLY
// ============================================================

router.delete(
    "/:productId",

    authMiddleware,

    authorizeRoles(
        "admin"
    ),

    productIdValidator,

    validateRequest,

    productController.deleteProduct
);


// ============================================================
// 6. GET ALL PRODUCTS
// ADMIN + SELLER + CUSTOMER
// ============================================================

router.get(
    "/",

    productController.getProducts
);


export default router;