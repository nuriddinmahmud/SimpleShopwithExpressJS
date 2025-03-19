const Orders = require("../models/orders.model")
const OrdersItem = require("../models/ordersItem.model")
const Users = require("../models/users.model")
const Validation =  require("../validations/orders.validation")



async function getAll(req,res) {
    try {
        if(req.query.userID){
            let data = await Orders.findAll({
                where: {userID: req.query.userID},
                include: [
                    {
                        model: Users,
                        as: "user",
                        attributes: ["id", "name"]
                    }
                ]
            })
            res.send(data)
            return;
        }
        let data = await Orders.findAll()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}

async function getOne(req,res) {
    try {
        let data = await Orders.findByPk(req.params.id,{
            include: [
                {
                    model: Users,
                    as: "user",
                    attributes: ["id", "name"]
                }
            ]
        } )
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}

async function post(req,res) {
    try {
        const {error} = Validation.ordersValidation.validate(req.body)
        if(error){
            res.send(error.message)
            return;
        }
        const items = await OrdersItem.create({userID: req.userID, })
        const order = await Orders.create(req.body)
        res.send(order)
    } catch (error) {
        res.send(error.message)
    }
}


async function update(req,res) {
    try {
        const {error} = Validation.ordersValidationUpdate.validate(req.body)
        if(error){
            res.send(error.message)
            return;
        }
        const order = await Orders.findByPk(req.params.id)
        if(!order){
            res.status(404).send("Not found")
            return;
        }
        await order.update(req.body)
        res.send(order)
    } catch (error) {
        res.send(error.message)
    }
}

async function remove(params) {
    try {
        const order = await Orders.findByPk(req.params.id)
        if(!order){
            res.status(404).send("Not found")
            return;
        }
        await order.destroy()
        res.send("Deleted")
    } catch (error) {
        res.send(error.message)
    }
}



module.exports = {getAll, getOne, update, remove, post}