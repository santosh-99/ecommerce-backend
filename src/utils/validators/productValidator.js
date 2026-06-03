import {body} from "express-validator";
const productRules = [
    body("name")
    .trim()
    .notEmpty().withMessage("Product name is required") 
    .isLength({ min: 3 }).withMessage("Name should be at lease 3 characters"),

    body("desc")
    .trim()
    .notEmpty().withMessage("Description is required"),

    body("price")
    .notEmpty().withMessage("Price is required")
    .isNumeric().withMessage("Price must be a number")
    .custom((value) => value >= 0).withMessage("Price cannot be negative"),


    body("category")
    .trim()
    .notEmpty().withMessage("Category is required")
    .toLowerCase()
    .withMessage("Invalid category"),

    body("size")
    .optional()
    .isArray().withMessage("Size must be an array")
    .custom((arr) => arr.length > 0).withMessage("Size array cannot be empty"),
];

export default productRules;