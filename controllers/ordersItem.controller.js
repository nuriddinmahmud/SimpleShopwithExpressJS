const Orders = require("../models/orders.model");
const Users = require("../models/users.model");
const OrdersItem = require("../models/ordersItem.model");
const Products = require("../models/products.model");
const {
  ordersItemValidation,
  ordersItemValidationUpdate,
} = require("../validations/ordersItem.validation.js");
const { Op } = require("sequelize");

const createOrder = async (req, res) => {
  const { error } = ordersItemValidation(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });
  try {
    const { userID, items } = req.body;

    const user = await Users.findByPk(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newOrder = await Orders.create({ userID });

    if (items && items.length > 0) {
      const orderItems = items.map((item) => ({
        orderID: newOrder.id,
        productID: item.productID,
        count: item.count,
      }));

      await OrdersItem.bulkCreate(orderItems);
    }

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "DESC",
      userID,
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (userID) {
      whereClause.userID = userID;
    }

    const orders = await Orders.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Users,
          attributes: ["id", "fullName", "email"],
        },
        {
          model: OrdersItem,
          include: [{ model: Products, attributes: ["id", "name", "price"] }],
        },
      ],
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      totalOrders: orders.count,
      totalPages: Math.ceil(orders.count / limit),
      currentPage: parseInt(page),
      orders: orders.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findByPk(id, {
      include: [
        {
          model: Users,
          attributes: ["id", "fullName", "email"],
        },
        {
          model: OrdersItem,
          include: [{ model: Products, attributes: ["id", "name", "price"] }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const patchOrder = async (req, res) => {
  const { error } = ordersItemValidationUpdate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });
  try {
    const { id } = req.params;
    const { userID, items } = req.body;

    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (userID) {
      const user = await Users.findByPk(userID);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      order.userID = userID;
    }

    await order.save();

    if (items && items.length > 0) {
      await OrdersItem.destroy({ where: { orderID: id } });

      const orderItems = items.map((item) => ({
        orderID: id,
        productID: item.productID,
        count: item.count,
      }));

      await OrdersItem.bulkCreate(orderItems);
    }

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await OrdersItem.destroy({ where: { orderID: id } });
    await order.destroy();
    res.json({ message: "Order and associated items deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  patchOrder,
};
