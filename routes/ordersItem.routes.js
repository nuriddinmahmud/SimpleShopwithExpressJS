// const express = require("express");
// const {
//   create,
//   getAll,
//   getOne,
//   update,
//   remove,
// } = require("../controllers/ordersItem.controller");

// const verifyToken = require("../middleware/verifyToken");
// const checkRole = require("../middleware/rolePolice");
// const selfPolice = require("../middleware/selfPolice");

// const OrdersItemROuter = express.Router();

// OrdersItemROuter.post(
//   "/",
//   verifyToken,
//   selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
//   create
// );

// OrdersItemROuter.get("/", getAll);

// OrdersItemROuter.get("/:id", getOne);

// OrdersItemROuter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

// OrdersItemROuter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

// module.exports = OrdersItemROuter;
