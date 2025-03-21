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
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               image:
 *                 type: string
 *                 description: The image URL of the category
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request. Validation error or category already exists
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       500:
 *         description: Internal server error
 */

CategoryRouter.post("/", verifyToken, selfPolice(["Admin"]), post);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories with filter, sort, and pagination
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page (default is 10)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Column to sort by (default is "name")
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sorting order (ascending or descending)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Search by name
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       500:
 *         description: Internal server error
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
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

CategoryRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the category
 *               image:
 *                 type: string
 *                 description: The updated image URL of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

CategoryRouter.patch(
  "/:id",
  verifyToken,
  checkRole(["Admin", "SuperAdmin"]),
  update
);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

CategoryRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         image:
 *           type: string
 *           description: The image URL of the category
 *       example:
 *         id: 1
 *         name: Electronics
 *         image: http://example.com/image.jpg
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = CategoryRouter;
