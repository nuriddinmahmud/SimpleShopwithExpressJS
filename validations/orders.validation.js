const Joi = require("joi")

const ordersValidation = Joi.object({
    userID: Joi.number().min(1).required(),
})

module.exports = ordersValidation