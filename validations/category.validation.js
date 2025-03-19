const Joi = require("joi");

const categoryValidation = Joi.object({
  name: Joi.string().required().max(255).min(2),
  image: Joi.string().uri().required(),
});

const categoryValidationUpdate = Joi.object({
  name: Joi.string().max(255).min(2).optional(),
  image: Joi.string().uri().optional(),
});

module.exports = { categoryValidation, categoryValidationUpdate };
