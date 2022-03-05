const Joi = require('@hapi/joi');

const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});


module.exports = { loginValidation };