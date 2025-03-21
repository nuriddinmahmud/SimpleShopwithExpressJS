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
 * /api/regions:
 *   post:
 *     summary: Create a new region
 *     security:
 *       - BearerAuth: []
 *     tags: [Regions]
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
 *       422:
 *         description: Validation error
 */
RegionRouter.post(
  "/",
  verifyToken,
  selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  create
);

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
 *         description: Search for regions by name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of regions per page
 *     responses:
 *       200:
 *         description: List of all regions
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
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Region found
 *       404:
 *         description: Not found
 */
RegionRouter.get("/:id", getOne);

/**
 * @swagger
 * /api/regions/{id}:
 *   patch:
 *     summary: Update a region
 *     security:
 *       - BearerAuth: []
 *     tags: [Regions]
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
RegionRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

/**
 * @swagger
 * /api/regions/{id}:
 *   delete:
 *     summary: Delete a region
 *     security:
 *       - BearerAuth: []
 *     tags: [Regions]
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
RegionRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = RegionRouter;