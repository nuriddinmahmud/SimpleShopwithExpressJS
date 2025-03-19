const {Router} = require("express")
const Orders = require("../models/orders.model")
const OrdersItem = require("../models/ordersItem.model")
const Validation =  require("../validations/orders.validation")

const app = Router()

async function middle(roles) {
    const middleware = async (req, res, next) => {
        const token = req.header("Authorization")?.split(" ")[1]
        if(!token){
            res.status(401).send("Token not found")
            return;
        }
        const data = jwt.verify(token, "secret") // token secret kodi
        req.userID = data.userID
        if(!data){
            res.status(401).send("Token not found")
            return;
        }
        if(!roles.includes(data.role)){
            res.send("Not allowed")
            return;
        }
        next()
    }

}


app.get("/",async(req,res)=>{
    try {
        if(req.query.userID){
            let data = await Orders.findAll({where: {userID: req.query.userID}})
            res.send(data)
            return;
        }
        let data = await Orders.findAll()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

// app.post("/",async(req,res)=>{
//     try {
//         const {error} = Validation.validate(req.body)
//         if(error){
//             res.send(error.message)
//             return;
//         }
//         const items = await OrdersItem.create({userID: req.userID, })
//         const order = await Orders.create(req.body)
//         res.send(order)
//     } catch (error) {
//         res.send(error.message)
//     }
// })


// app.patch("/:id",async(req,res)=>{
//     try {
//         const {error} = Validation.validate(req.body)
//         if(error){
//             res.send(error.message)
//             return;
//         }
//         const order = await Orders.findByPk(req.params.id)
//         if(!order){
//             res.status(404).send("Not found")
//             return;
//         }
//         await order.update(req.body)
//         res.send(order)
//     } catch (error) {
//         res.send(error.message)
//     }
// })

// app.delete("/:id",async(req,res)=>{
//     try {
//         const order = await Orders.findByPk(req.params.id)
//         if(!order){
//             res.status(404).send("Not found")
//             return;
//         }
//         await order.destroy()
//         res.send("Deleted")
//     } catch (error) {
//         res.send(error.message)
//     }
// })



module.exports = app