const Orders = require("../models/orders.model");
const OrdersItem = require("../models/ordersItem.model");
const Users = require("../models/users.model");
const {
  ordersValidation,
  ordersValidationUpdate,
} = require("../validations/orders.validation");

async function getAll(req, res) {
  try {
    let whereCondition = req.query.userID ? { userID: req.query.userID } : {};
    let data = await Orders.findAll({
      where: whereCondition,
      include: [
        { model: Users, as: "user", attributes: ["id", "fullName"] },
        { model: OrdersItem, as: "items" },
      ],
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getOne(req, res) {
  try {
    let data = await Orders.findByPk(req.params.id, {
      include: [
        { model: Users, as: "user", attributes: ["id", "fullName"] },
        { model: OrdersItem, as: "items" },
      ],
    });
    if (!data) return res.status(404).send({ message: "Order not found" });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function post(req, res) {
  try {
    const { error } = ordersValidation.validate(req.body);
    if (error) return res.status(400).send({ error: error.message });

    const newOrder = await Orders.create({
      userID: req.body.userID,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
    });

    if (req.body.items && Array.isArray(req.body.items)) {
      await Promise.all(
        req.body.items.map(async (item) => {
          await OrdersItem.create({
            orderID: newOrder.id,
            productID: item.productID,
            quantity: item.quantity,
            price: item.price,
          });
        })
      );
    }

    res
      .status(201)
      .send({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const { error } = ordersValidationUpdate.validate(req.body);
    if (error) return res.status(400).send({ error: error.message });

    const order = await Orders.findByPk(req.params.id);
    if (!order) return res.status(404).send({ message: "Order not found" });

    await order.update({
      totalAmount: req.body.totalAmount,
      status: req.body.status,
    });

    if (req.body.items && Array.isArray(req.body.items)) {
      const existingItems = await OrdersItem.findAll({ where: { orderID: order.id } });

      const itemsToDelete = existingItems.filter(
        (existingItem) => !req.body.items.some((item) => item.productID === existingItem.productID)
      );

      const itemsToAdd = req.body.items.filter(
        (item) => !existingItems.some((existingItem) => existingItem.productID === item.productID)
      );

      const itemsToUpdate = req.body.items.filter((item) =>
        existingItems.some((existingItem) => existingItem.productID === item.productID)
      );

      await Promise.all(
        itemsToDelete.map(async (item) => {
          await OrdersItem.destroy({ where: { id: item.id } });
        })
      );

      await Promise.all(
        itemsToAdd.map(async (item) => {
          await OrdersItem.create({
            orderID: order.id,
            productID: item.productID,
            quantity: item.quantity,
            price: item.price,
          });
        })
      );

      await Promise.all(
        itemsToUpdate.map(async (item) => {
          await OrdersItem.update(
            { quantity: item.quantity, price: item.price },
            { where: { orderID: order.id, productID: item.productID } }
          );
        })
      );
    }

    res.send({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const order = await Orders.findByPk(req.params.id);
    if (!order) return res.status(404).send({ message: "Order not found" });

    await OrdersItem.destroy({ where: { orderID: order.id } });
    await order.destroy();

    res.send({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = { getAll, getOne, post, update, remove };
