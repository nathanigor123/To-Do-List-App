const api = require('../utils/api.response.formatting');


const joiValidator = (schema, subject = 'body', options = {allowUnknown: true, abortEarly: false}) => {

    return (req, res, next) => {

        const {error} = schema.validate(req[subject], options);
        if (error) {
            const message = api.formatValidationError(error);
            console.log(error);
            return api.errorResponse(res, message, 422);
        }

        next()
    }
};

const validate = {
    joiValidator,
};

module.exports = validate;