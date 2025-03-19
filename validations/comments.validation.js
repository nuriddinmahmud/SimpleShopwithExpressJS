const Joi = require("joi");

function commentsValidation(data) {
  const commentSchema = Joi.object({
    description: Joi.string().min(5).max(500).required(),
    markedStar: Joi.number().integer().min(1).max(5).required(),
    userID: Joi.number().integer().positive().required(),
    productID: Joi.number().integer().positive().required(),
  });

  return commentSchema.validate(data, { abortEarly: false });
}

function commentsValidationUpdate(data) {
  const commentSchema = Joi.object({
    description: Joi.string().min(5).max(500),
    markedStar: Joi.number().integer().min(1).max(5),
    userID: Joi.number().integer().positive(),
    productID: Joi.number().integer().positive(),
  });

  return commentSchema.validate(data, { abortEarly: false });
}

module.exports = { commentsValidation, commentsValidationUpdate };
