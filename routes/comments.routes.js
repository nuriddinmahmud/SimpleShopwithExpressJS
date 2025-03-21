const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/comments.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");
const selfPolice = require("../middleware/selfPolice");

const CommentRouter = express.Router();

/**
 * @swagger
<<<<<<< HEAD
 * tags:
 *   name: Comments
 *   description: API for managing comments
 */

/**
 * @swagger
=======
>>>>>>> 51bcae8c7fd3e910da6261a85ca88062f4ff935f
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The content of the comment
 *               markedStar:
 *                 type: integer
 *                 description: The star rating associated with the comment
 *               userID:
 *                 type: integer
 *                 description: The ID of the user who created the comment
 *               productID:
 *                 type: integer
 *                 description: The ID of the product the comment is associated with
 *     responses:
 *       200:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       500:
 *         description: Internal server error
 */

CommentRouter.post("/", verifyToken, selfPolice(["Admin"]), create);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search comments by description
 *       - in: query
 *         name: userID
 *         schema:
 *           type: integer
 *         description: Filter comments by user ID
 *       - in: query
 *         name: productID
 *         schema:
 *           type: integer
 *         description: Filter comments by product ID
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
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of comments
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

CommentRouter.get("/", getAll);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

CommentRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The updated content of the comment
 *               markedStar:
 *                 type: integer
 *                 description: The updated star rating associated with the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

CommentRouter.patch(
  "/:id",
  verifyToken,
  checkRole(["Admin", "SuperAdmin"]),
  update
);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

CommentRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the comment
 *         description:
 *           type: string
 *           description: The content of the comment
 *         markedStar:
 *           type: integer
 *           description: The star rating associated with the comment
 *         userID:
 *           type: integer
 *           description: The ID of the user who created the comment
 *         productID:
 *           type: integer
 *           description: The ID of the product the comment is associated with
 *         User:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             fullName:
 *               type: string
 *         Product:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *       example:
 *         id: 1
 *         description: "Great product!"
 *         markedStar: 5
 *         userID: 1
 *         productID: 1
 *         User:
 *           id: 1
 *           fullName: "John Doe"
 *         Product:
 *           id: 1
 *           name: "Smartphone"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = CommentRouter;
