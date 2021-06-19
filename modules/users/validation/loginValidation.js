const Joi = require('@hapi/joi');

const loginValidation = Joi.object({
    email:Joi.string()
            .min(3)
            .max(20)
            .required(),
    password: Joi.string()
                .required(),
})


module.exports = { loginValidation };