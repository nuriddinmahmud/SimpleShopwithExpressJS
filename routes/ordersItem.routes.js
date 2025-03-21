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

/**
 * @swagger
 * /api/orders-items:
 *   post:
 *     summary: Create a new order item
 *     security:
 *       - BearerAuth: []
 *     tags: [Orders Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *               orderID:
 *                 type: string
 *               userID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Validation error
 */
ordersItemRouter.post(
  "/",
  verifyToken,
  selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  post
);

/**
 * @swagger
 * /api/orders-items:
 *   get:
 *     summary: Get all order items
 *     tags: [Orders Items]
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: string
 *         description: Filter order items by user ID
 *     responses:
 *       200:
 *         description: List of all order items
 */
ordersItemRouter.get("/", getAll);

/**
 * @swagger
 * /api/orders-items/{id}:
 *   get:
 *     summary: Get an order item by ID
 *     tags: [Orders Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item found
 *       404:
 *         description: Not found
 */
ordersItemRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/orders-items/{id}:
 *   patch:
 *     summary: Update an order item
 *     security:
 *       - BearerAuth: []
 *     tags: [Orders Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Not found
 */
ordersItemRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

/**
 * @swagger
 * /api/orders-items/{id}:
 *   delete:
 *     summary: Delete an order item
 *     security:
 *       - BearerAuth: []
 *     tags: [Orders Items]
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
ordersItemRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = ordersItemRouter;