const Joi = require('@hapi/joi');

const registerValidationSchema = Joi.object({
    //name validation
    first_name:Joi.string()
            .min(3)
            .max(20)
            .required(),
    //email validation
    email: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(128)
        .required(),
    //password validation
    password: Joi.string()
                    .required()
    //.pattern(new RegExp()),
   // repeat_password: Joi.ref('password'),
})



module.exports = { registerValidationSchema };