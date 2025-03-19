const {Router} = require("express")
const Orders = require("../models/orders.model")
const app = Router()

app.get("/",async(req,res)=>{
    let data = await Orders.findAll()
    res.send(data)
} )





module.exports = app