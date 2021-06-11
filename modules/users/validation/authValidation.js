const Joi = require('@hapi/joi');

const authValidation = Joi.object({
    first_name:Joi.string()
            .min(3)
            .max(20)
            .required(),
    email: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(128)
        .required(),
    password: Joi.string()
                .required(),

    mobile:Joi.string(),

    last_name:Joi.string()
})


module.exports = { authValidation };