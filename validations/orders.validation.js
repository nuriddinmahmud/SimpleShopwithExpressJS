const Joi = require("joi");

const ordersValidation = Joi.object({
  productID: Joi.number().min(1).required(),
  count: Joi.number().min(1).required(),
});

const ordersValidationUpdate = Joi.object({
  productID: Joi.number().min(1).required(),
  count: Joi.number().min(1).required(),
});

module.exports = { ordersValidation, ordersValidationUpdate };
