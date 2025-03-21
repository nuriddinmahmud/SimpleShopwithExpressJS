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

/**
 * @swagger
<<<<<<< HEAD
 * tags:
 *   name: Regions
 *   description: API for managing regions
 */

/**
 * @swagger
=======
>>>>>>> 51bcae8c7fd3e910da6261a85ca88062f4ff935f
 * /api/regions:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
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
 *                 description: The name of the region
 *     responses:
 *       200:
 *         description: Region created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       500:
 *         description: Internal server error
 */

RegionRouter.post("/", verifyToken, selfPolice(["Admin"]), create);

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search regions by name
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
 *         description: Field to sort by (e.g., "name")
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order (ASC or DESC)
 *     responses:
 *       200:
 *         description: List of regions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of regions
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Region'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

RegionRouter.get("/", getAll);

/**
 * @swagger
 * /api/regions/{id}:
 *   get:
 *     summary: Get a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The region ID
 *     responses:
 *       200:
 *         description: Region found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       404:
 *         description: Region not found
 *       500:
 *         description: Internal server error
 */

RegionRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/regions/{id}:
 *   patch:
 *     summary: Update a region by ID
 *     tags: [Regions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the region
 *     responses:
 *       200:
 *         description: Region updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Region not found
 *       500:
 *         description: Internal server error
 */

RegionRouter.patch(
  "/:id",
  verifyToken,
  checkRole(["Admin", "SuperAdmin"]),
  update
);

/**
 * @swagger
 * /api/regions/{id}:
 *   delete:
 *     summary: Delete a region by ID
 *     tags: [Regions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The region ID
 *     responses:
 *       200:
 *         description: Region deleted successfully
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       403:
 *         description: Forbidden. User does not have the required role
 *       404:
 *         description: Region not found
 *       500:
 *         description: Internal server error
 */

RegionRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

/**
 * @swagger
 * components:
 *   schemas:
 *     Region:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the region
 *         name:
 *           type: string
 *           description: The name of the region
 *       example:
 *         id: 1
 *         name: "Tashkent"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = RegionRouter;
