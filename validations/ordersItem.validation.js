const Joi = require("joi")

const ordersItemValidation = Joi.object({
    count: Joi.number().required().min(1).max(99),
    orderID: Joi.number().min(1),
    productID: Joi.number().required().min(1)
})

module.exports = ordersItemValidation