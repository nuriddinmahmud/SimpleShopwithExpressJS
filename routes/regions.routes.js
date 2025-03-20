const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/regions.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const RegionRouter = express.Router();

RegionRouter.post(
  "/",
  // verifyToken,
  // selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  create
);

RegionRouter.get("/", getAll);

RegionRouter.get("/:id", getOne);

RegionRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

RegionRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = RegionRouter;
