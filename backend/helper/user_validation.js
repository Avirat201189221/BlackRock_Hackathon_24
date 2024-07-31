const { check } = require('express-validator');

const userValidators = [
    check('phoneNumber')
        .matches(/^\d{10}$/)
        .withMessage('Please enter a valid 10-digit phone number')
        .notEmpty()
        .withMessage('Phone number is required'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character')
        .notEmpty()
        .withMessage('Password is required')
];

module.exports = { userValidators };
