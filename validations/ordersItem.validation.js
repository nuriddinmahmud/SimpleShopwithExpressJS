const Joi = require("joi")

const schema = Joi.object({
    count: Joi.number().required().min(1).max(99),
    orderID: Joi.number().min(1),
    productID: Joi.number().required().min(1)
})

module.exports = schema