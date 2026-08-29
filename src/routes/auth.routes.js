import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

import {
    registerValidator,
    loginValidator
} from "../validators/auth.validator.js";

import validateRequest from "../middlewares/validate-req-middleware.js";


const router = Router();


// ============================================================
// REGISTER
// ============================================================

router.post(
    "/register",
    registerValidator,
    validateRequest,
    authController.register
);


// ============================================================
// LOGIN
// ============================================================

router.post(
    "/login",
    loginValidator,
    validateRequest,
    authController.login
);


// ============================================================
// LOGOUT
// ============================================================

router.post(
    "/logout",
    authMiddleware,
    authController.logout
);


// ============================================================
// CURRENT AUTHENTICATED USER
// ============================================================

router.get(
    "/me",
    authMiddleware,
    authController.me
);


export default router;