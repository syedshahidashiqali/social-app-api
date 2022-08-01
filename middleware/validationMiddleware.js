const { validator } = require('../utils/validate');
const { apiValidationErrors } = require("../utils/apiHelpers")

const validationMiddleWare = (validationRule, param = "body") => {
    return async (req, res, next) => {
        await validator(req[param], validationRule, {}, (err, status) => {
            if (!status) {
                res.status(412).json(apiValidationErrors(err))
            } else {
                next();
            }
        }).catch( err => console.log(err))
    }
}

module.exports = {
    validationMiddleWare
};