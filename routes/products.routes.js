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

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               image:
 *                 type: string
 *                 description: The image URL of the product
 *               price:
 *                 type: integer
 *                 description: The price of the product
 *               userID:
 *                 type: integer
 *                 description: The ID of the user who created the product
 *               categoryID:
 *                 type: integer
 *                 description: The ID of the category the product belongs to
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       500:
 *         description: Internal server error
 */

ProductRouter.post("/", verifyToken, selfPolice(["Admin"]), create);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name
 *       - in: query
 *         name: userID
 *         schema:
 *           type: integer
 *         description: Filter products by user ID
 *       - in: query
 *         name: categoryID
 *         schema:
 *           type: integer
 *         description: Filter products by category ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., "name", "price")
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order (ASC or DESC)
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of products
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

ProductRouter.get("/", getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

ProductRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product
 *               description:
 *                 type: string
 *                 description: The updated description of the product
 *               image:
 *                 type: string
 *                 description: The updated image URL of the product
 *               price:
 *                 type: integer
 *                 description: The updated price of the product
 *               userID:
 *                 type: integer
 *                 description: The updated ID of the user who created the product
 *               categoryID:
 *                 type: integer
 *                 description: The updated ID of the category the product belongs to
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

ProductRouter.patch(
  "/:id",
  verifyToken,
  checkRole(["Admin", "SuperAdmin"]),
  update
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

ProductRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         image:
 *           type: string
 *           description: The image URL of the product
 *         price:
 *           type: integer
 *           description: The price of the product
 *         userID:
 *           type: integer
 *           description: The ID of the user who created the product
 *         categoryID:
 *           type: integer
 *           description: The ID of the category the product belongs to
 *         Category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         User:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *       example:
 *         id: 1
 *         name: "Smartphone"
 *         description: "A high-end smartphone"
 *         image: "http://example.com/image.jpg"
 *         price: 999
 *         userID: 1
 *         categoryID: 1
 *         Category:
 *           id: 1
 *           name: "Electronics"
 *         User:
 *           id: 1
 *           name: "John Doe"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = ProductRouter;
