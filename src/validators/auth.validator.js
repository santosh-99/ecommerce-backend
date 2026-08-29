import { body } from 'express-validator';

export const registerValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long.'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('invalid email address.')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('password is required.')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters.'),

    body('type')
        .optional()
        .isIn(['customer', 'seller', 'admin'])
        .withMessage('Invalid user type.'),
];

export const loginValidator = [
    body('email')
    .trim().notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.'),


    body('password')
    .notEmpty()
    .withMessage('Password is required.'),
];
