const Joi = require("joi");

function usersValidation(data) {
  const Users = Joi.object({
    fullName: Joi.string()
      .max(25)
      .min(2)
      .pattern(/^[a-zA-Z]+$/)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "uz", "ru", "en"] } })
      .required(),
    phone: Joi.string()
      .length(13)
      .pattern(/^\+998\d{9}$/)
      .required(),
    password: Joi.string()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    role: Joi.string().valid("Admin", "User", "SuperAdmin").required(),
    avatar: Joi.string().required(),
    status: Joi.string().valid("Active", "Inactive").optional(),
    regionID: Joi.number().required(),
    yearOfBirth: Joi.number().required(),
  });

  return Users.validate(data, { abortEarly: true });
}

function usersValidationUpdate(data) {
  const Users = Joi.object({
    fullName: Joi.string()
      .min(2)
      .max(25)
      .pattern(/^[a-zA-Z]+$/)
      .optional(),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "uz", "ru", "en"] } })
      .optional(),
    phone: Joi.string()
      .length(13)
      .pattern(/^\+998\d{9}$/)
      .optional(),
    password: Joi.string()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .optional(),
    role: Joi.string()
      .valid("Admin", "User", "Seller", "SuperAdmin")
      .optional(),
    avatar: Joi.string().optional(),
    status: Joi.string().valid("Active", "Inactive").optional(),
    regionID: Joi.number().optional(),
  });

  return Users.validate(data, { abortEarly: true });
}

module.exports = { usersValidation, usersValidationUpdate };
