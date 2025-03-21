const Orders = require("../models/orders.model");
const Users = require("../models/users.model");
const OrdersItem = require("../models/ordersItem.model");
const {
  ordersValidation,
  ordersValidationUpdate,
} = require("../validations/orders.validation.js");
const { Op } = require("sequelize");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    for (const item of items) {
      const { error } = ordersValidation.validate(item);
      if (error) return res.status(422).json({ error: error.details[0].message });
    }

    const user = await Users.findByPk(req.userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = await Orders.sequelize.transaction();

    try {
      const newOrder = await Orders.create(
        { userID: req.userID },
        { transaction }
      );

      const orderItems = items.map((item) => ({
        orderID: newOrder.id,
        productID: item.productID,
        count: item.count,
        userID: req.userID,
      }));

      await OrdersItem.bulkCreate(orderItems, { transaction });

      await transaction.commit();

      res.status(201).json({ message: "Order created successfully", order: orderItems });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
      sortBy = "id",
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

const getMyOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "id",
      order = "DESC",
      userID,
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (userID) {
      whereClause.userID = userID;
    }

    const orders = await OrdersItem.findAll({
      where: {userID: req.userID},
      include: [
        {
          model: Users,
          attributes: ["id", "fullName", "email"],
        }
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

const updateOrder = async (req, res) => {
  const { error, value } = ordersValidationUpdate(req.body);
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
        quantity: item.quantity,
        price: item.price,
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

    await order.destroy();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateOrder,
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  getMyOrders
};
