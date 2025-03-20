const express = require("express");
const {
  post,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/category.controller.js");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const CategoryRouter = express.Router();

CategoryRouter.post(
  "/",
  verifyToken,
  selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  post
);

CategoryRouter.get("/", getAll);

CategoryRouter.get("/:id", getOne);

CategoryRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

CategoryRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = CategoryRouter;
