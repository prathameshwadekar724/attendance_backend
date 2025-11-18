const Joi = require("joi");

let attendanceValidation = Joi.object({
    studentId: Joi.string().required(),
    status: Joi.string().valid("Present", "Absent").required(),
    date: Joi.date().optional()
});

module.exports = attendanceValidation;
