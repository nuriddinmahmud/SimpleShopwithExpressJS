const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/products.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const ProductRouter = express.Router();

ProductRouter.post("/", verifyToken, selfPolice(['Admin', 'SuperAdmin']), create);

ProductRouter.get("/", getAll);

ProductRouter.get("/:id", getOne);

ProductRouter.patch("/:id", verifyToken, checkRole(['Admin']), update);

ProductRouter.delete("/:id", verifyToken, checkRole(['Admin']), remove);