const Joi = require("joi");

let userValidation = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid("admin", "teacher").required()
});

module.exports = userValidation;
