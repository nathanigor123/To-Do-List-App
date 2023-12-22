const Joi = require('joi');

storeRules = Joi.object({
    title: Joi.string().min(2).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.empty":
                    err.message = "Value should not be empty!";
                    break;
                case "string.min":
                    err.message = `Value should have at least ${err.local.limit} characters!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),


})

module.exports = {
    storeRules
};;