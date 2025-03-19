const Joi = require("joi");

function productsValidation(data) {
  const productSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(5).max(500).required(),
    star: Joi.number().integer().min(1).max(5).required(),
    image: Joi.string().uri().required(),
    price: Joi.number().integer().positive().required(),
    userID: Joi.number().integer().positive().required(),
    categoryID: Joi.number().integer().positive().required(),
  });

  return productSchema.validate(data, { abortEarly: false });
}

function productsValidationUpdate(data) {
  const productSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    description: Joi.string().min(5).max(500),
    star: Joi.number().integer().min(1).max(5),
    image: Joi.string().uri(),
    price: Joi.number().integer().positive(),
    userID: Joi.number().integer().positive(),
    categoryID: Joi.number().integer().positive(),
  });

  return productSchema.validate(data, { abortEarly: false });
}

module.exports = { productsValidation, productsValidationUpdate };
