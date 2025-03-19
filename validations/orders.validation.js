const Joi = require("joi");

const ordersValidation = Joi.object({
  userID: Joi.number().min(1).required(),
});

const ordersValidationUpdate = Joi.object({
  userID: Joi.number().min(1).optional(),
});

module.exports = { ordersValidation, ordersValidationUpdate };
