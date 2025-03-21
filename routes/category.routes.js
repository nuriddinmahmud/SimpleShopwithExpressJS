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

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     security:
 *       - BearerAuth: []
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Category already exists
 */
CategoryRouter.post(
  "/",
  verifyToken,
  selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  post
);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 */
CategoryRouter.get("/", getAll);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Not found
 */
CategoryRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Update a category
 *     security:
 *       - BearerAuth: []
 *     tags: [Categories]
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Not found
 */
CategoryRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     security:
 *       - BearerAuth: []
 *     tags: [Categories]
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
CategoryRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = CategoryRouter;