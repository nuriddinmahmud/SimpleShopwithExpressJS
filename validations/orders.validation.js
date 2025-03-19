const Joi = require("joi")

const schema = Joi.object({
    userID: Joi.number().min(1).required(),
})

module.exports = schema