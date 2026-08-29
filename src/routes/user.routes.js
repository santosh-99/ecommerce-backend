import { Router } from "express";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.Middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";


const router = Router();


// ============================================================
// GET ALL SELLERS
// ADMIN ONLY
// ============================================================
router.get(
    "/sellers",
    authMiddleware,
    authorizeRoles("admin"),

    function(req, res, next) {
        return userController.getSellers(
            req, res, next
        );
    }
);



// GET ALL USERS
// ADMIN ONLY
// ============================================================

router.get(

    "/",

    authMiddleware,

    authorizeRoles("admin"),

    function (req, res, next) {

        return userController.getUsers(
            req,
            res,
            next
        );

    }

);


// ============================================================
// GET USER BY ID
// ADMIN ONLY
// ============================================================

router.get(

    "/:userId",

    authMiddleware,

    authorizeRoles("admin"),

    function (req, res, next) {

        return userController.getUserById(
            req,
            res,
            next
        );

    }

);


// ============================================================
// UPDATE USER
// ADMIN ONLY
// ============================================================

router.patch(

    "/:userId",

    authMiddleware,

    authorizeRoles("admin"),

    function (req, res, next) {

        return userController.updateUser(
            req,
            res,
            next
        );

    }

);


// ============================================================
// DELETE USER
// ADMIN ONLY
// ============================================================

router.delete(

    "/:userId",

    authMiddleware,

    authorizeRoles("admin"),

    function (req, res, next) {

        return userController.deleteUser(
            req,
            res,
            next
        );

    }

);


export default router;