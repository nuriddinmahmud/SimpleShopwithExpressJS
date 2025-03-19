const express = require("express");
const {
  getAll,
  getOne,
  update,
  remove,
  post,
} = require("../controllers/ordersItem.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const ordersItemRouter = express.Router();

ordersItemRouter.post(
  "/",
  verifyToken,
  selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  post
);

ordersItemRouter.get("/", getAll);

ordersItemRouter.get("/:id", getOne);

ordersItemRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

ordersItemRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = ordersItemRouter;
