<<<<<<< HEAD
const OrdersItem = require("../models/ordersItem.model")
const Orders = require("../models/orders.model")
const Validation =  require("../validations/ordersItem.validation")
const Products = require("../models/products.model")




async function getOne(req,res, id) {
    try {
        let data = await OrdersItem.findOne({
            where: {id: id},
            include: [
                {   
                    model: Orders,
                    as: "order",
                    attributes: ["id", "name"]
                },
                {
                    model: Products,
                    as: "product",
                    attributes: ["id", "name"]
                }]

        })
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
}

async function getAll(req, res){
    try {
        if(req.query.userID){
            let data = await OrdersItem.findAll({
                where: {userID: req.query.userID},
                include: [
                {   
                    model: Orders,
                    as: "order",
                    attributes: ["id", "name"]
                },
                {
                    model: Products,
                    as: "product",
                    attributes: ["id", "name"]
                }]
            })
            res.send(data)
            return;
        }
        let data = await OrdersItem.findAll()
        res.send(data)
    } catch (error) {
        res.send(error.message)
=======
const OrdersItem = require("../models/ordersItem.model.js");
const Orders = require("../models/orders.model.js");
const ordersItemValidation = require("../validations/ordersItem.validation");

async function getOne(req, res, id) {
  try {
    let data = await OrdersItem.findOne({ where: { id: id } });
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
}

async function getAll(req, res) {
  try {
    if (req.query.userID) {
      let data = await OrdersItem.findAll({
        where: { userID: req.query.userID },
      });
      res.send(data);
      return;
>>>>>>> 6223b77924741775dd44cc81e70f403de62e81e3
    }
    let data = await OrdersItem.findAll();
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
}

<<<<<<< HEAD
async function post(req,res) {
    try {
        const {error} = Validation.ordersItemValidation.validate(req.body)
        if(error){
            res.send(error.message)
            return;
        }
        const ord = await Orders.create({userID: req.userID})
        
        const order = await OrdersItem.create({count: req.body.count,orderID: ord.id ,  userID: req.userID})
        res.send(order)
    } catch (error) {
        res.send(error.message)
=======
async function post(req, res) {
  try {
    const { error } = ordersItemValidation.validate(req.body);
    if (error) {
      res.send(error.message);
      return;
>>>>>>> 6223b77924741775dd44cc81e70f403de62e81e3
    }
    const ord = await Orders.create({ userID: req.userID });

    const order = await OrdersItem.create({
      count: req.body.count,
      orderID: ord.id,
      userID: req.userID,
    });
    res.send(order);
  } catch (error) {
    res.send(error.message);
  }
}

<<<<<<< HEAD
async function update(req,res) {
    try {
        const {error} = Validation.ordersItemValidationUpdate.validate(req.body)
        if(error){
            res.send(error.message)
            return;
        }
        const order = await OrdersItem.findByPk(req.params.id)
        if(!order){
            res.status(404).send("Not found")
            return;
        }
        await order.update(req.body)
        res.send(order)
    } catch (error) {
        res.send(error.message)
=======
async function update(req, res) {
  try {
    const { error } = ordersItemValidation.validate(req.body);
    if (error) {
      res.send(error.message);
      return;
>>>>>>> 6223b77924741775dd44cc81e70f403de62e81e3
    }
    const order = await OrdersItem.findByPk(req.params.id);
    if (!order) {
      res.status(404).send("Not found");
      return;
    }
    await order.update(req.body);
    res.send(order);
  } catch (error) {
    res.send(error.message);
  }
}

async function remove(req, res, id) {
  try {
    let ord = await OrdersItem.findOne({ where: { id: req.params.id } });
    if (!ord) {
      res.status(404).send("Not found");
      return;
    }
    await ord.destroy();
    res.send("Deleted");
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = { getOne, getAll, post, update, remove };
