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

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: string
 *         description: Filter orders by user ID
 *     responses:
 *       200:
 *         description: List of all orders
 */
OrderRouter.get("/", getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Not found
 */
OrderRouter.get("/:id", getOne);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     security:
 *       - BearerAuth: []
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Not found
 */
OrderRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = OrderRouter;
