const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  patchOrder,
} = require("../controllers/ordersItem.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const ordersItemRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: OrdersItem
 *   description: Order Items management
 */

/**
 * @swagger
 * /api/ordersItem:
 *   post:
 *     summary: Create a new order with multiple items
 *     tags: [OrdersItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                type: integer
 *               orderID:
 *                type: integer
 *               productID:
 *                type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input data
 */

ordersItemRouter.post("/", verifyToken, selfPolice(["Admin"]), createOrder);

/**
 * @swagger
 * /api/ordersItem:
 *   get:
 *     summary: Get all orders
 *     tags: [OrdersItem]
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: integer
 *         description: Filter orders by user ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: "createdAt"
 *         description: Sorting field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sorting order
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       400:
 *         description: Invalid request parameters
 */

ordersItemRouter.get("/", getOrders);

/**
 * @swagger
 * /api/ordersItem/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [OrdersItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */

ordersItemRouter.get("/:id", getOrderById);

/**
 * @swagger
 * /api/ordersItem/{id}:
 *   patch:
 *     summary: Update an order
 *     tags: [OrdersItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     productID:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Order not found
 */

ordersItemRouter.patch(
  "/:id",
  verifyToken,
  checkRole(["Admin", "SuperAdmin"]),
  patchOrder
);

/**
 * @swagger
 * /aoi/ordersItem/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [OrdersItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

ordersItemRouter.delete("/:id", verifyToken, checkRole(["Admin"]), deleteOrder);

module.exports = ordersItemRouter;
