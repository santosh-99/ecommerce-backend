import { body } from "express-validator";

export const registerRules = [
    body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 character long"),

    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("type")
    .optional()
    .isIn(["admin", "seller", "customer"]).withMessage("Invalid user type"),
];


export const loginRules = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

    body("password")
    .notEmpty().withMessage("Password is required"),
];