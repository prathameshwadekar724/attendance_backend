const Joi = require("joi");

let studentValidation = Joi.object({
    name: Joi.string().min(2).required(),
    rollNumber: Joi.string().required(),
    class: Joi.string().required(),
    division: Joi.string().required(),
    parentContact: Joi.string().min(10).max(15).required(),
    isActive: Joi.boolean().optional()
});

module.exports = studentValidation;
