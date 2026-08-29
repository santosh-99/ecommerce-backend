import { param } from "express-validator";

export const orderIdValidator = [
    param("orderId")
    .isMongoId()
    .withMessage("Invalid order ID")
];