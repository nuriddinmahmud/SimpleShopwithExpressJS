const express = require("express");
const {
  getAll,
  getOne,
  remove,
} = require("../controllers/orders.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const OrderRouter = express.Router();


OrderRouter.get("/", getAll);

OrderRouter.get("/:id", getOne);

OrderRouter.delete("/:id", verifyToken, checkRole(['Admin']), remove);

module.exports = OrderRouter; 