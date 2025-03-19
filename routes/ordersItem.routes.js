const {Router} = require("express")
const OrdersItem = require("../models/ordersItem.model")
const Orders = require("../models/orders.model")
const Validation =  require("../validations/ordersItem.validation")

const app = Router()



app.get("/",async(req,res)=>{
    try {
        if(req.query.userID){
            let data = await OrdersItem.findAll({where: {userID: req.query.userID}})
            res.send(data)
            return;
        }
        let data = await OrdersItem.findAll()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = app