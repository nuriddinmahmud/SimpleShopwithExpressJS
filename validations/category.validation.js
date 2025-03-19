const Joi = require("joi")

const schema = Joi.object({
    name: Joi.string().required().max(255).min(2)    
})

module.exports = schema