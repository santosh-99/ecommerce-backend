import { param, body } from "express-validator";


// ============================================================
// USER ID VALIDATOR
// ============================================================

export const userIdValidator = [

    param("userId")
        .notEmpty()
        .withMessage("User ID is required")

        .isMongoId()
        .withMessage("Invalid User ID")

];


// ============================================================
// UPDATE USER VALIDATOR
// ============================================================

export const updateUserValidator = [

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            "Name must be at least 3 characters long"
        ),


    body("email")
        .optional()
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage(
            "Please provide a valid email address"
        ),


    body("type")
        .optional()
        .isIn([
            "admin",
            "seller",
            "customer"
        ])
        .withMessage(
            "Invalid user type"
        )

];


export default {
    userIdValidator,
    updateUserValidator
};