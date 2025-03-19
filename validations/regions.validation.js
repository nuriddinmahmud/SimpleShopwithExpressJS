const Joi = require("joi");

function regionsValidation(data) {
  const regionSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required(),
  });

  return regionSchema.validate(data, { abortEarly: false });
}

function regionsValidationUpdate(data) {
  const regionSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/),
  });

  return regionSchema.validate(data, { abortEarly: false });
}

module.exports = { regionsValidation, regionsValidationUpdate };
