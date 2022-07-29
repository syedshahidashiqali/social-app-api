const { validator } = require('../utils/validate');
const { apiValidationErrors, apiError } = require("../utils/apiHelpers")

const signup = async (req, res, next) => {
    const validationRule = {
        "username": "required|string",
        "email": "required|string|email",
        "password": "required|string|min:8",
        "role": "required|string",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            })
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const signin = async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "password": "required|string|min:8",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            })
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    signup,
    signin
};