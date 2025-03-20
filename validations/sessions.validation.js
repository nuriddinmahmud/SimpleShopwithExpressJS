const Joi = require("joi");

function sessionsValidation(data) {
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

module.exports =  sessionsValidation;
