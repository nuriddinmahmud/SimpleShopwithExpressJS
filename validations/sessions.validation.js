const Joi = require("joi");

function sessionValidation(data) {
  const sessionSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    ipAddress: Joi.string()
      .ip({ version: ["ipv4", "ipv6"] })
      .required(),
    deviceInfo: Joi.string().max(255).allow(null, ""),
    createdAt: Joi.date(),
  });

  return sessionSchema.validate(data, { abortEarly: false });
}

function sessionValidationUpdate(data) {
  const sessionSchema = Joi.object({
    userId: Joi.number().integer().positive(),
    ipAddress: Joi.string().ip({ version: ["ipv4", "ipv6"] }),
    deviceInfo: Joi.string().max(255).allow(null, ""),
    createdAt: Joi.date(),
  });

  return sessionSchema.validate(data, { abortEarly: false });
}

module.exports = { sessionValidation, sessionValidationUpdate };
