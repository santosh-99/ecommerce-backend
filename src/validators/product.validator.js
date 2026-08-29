import { body, param, query } from "express-validator";


export const createProductValidator = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("desc")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Product category is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a valid non-negative number")
    .toFloat(),

  body("size")
    .optional()
    .isString()
    .withMessage("size must be a string")
];


export const updateProductValidator = [

  param("productId")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("desc")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product description cannot be empty"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product category cannot be empty"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price cannot be negative")
    .toFloat(),

  body("size")
    .optional()
    .isString()
    .withMessage("Size must be string")
];


export const productIdValidator = [

  param("productId")
    .isMongoId()
    .withMessage("Invalid product ID")
];


export const filterProductValidator = [

  query("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  query("size")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Size cannot be empty"),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a positive number"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a positive number")
];