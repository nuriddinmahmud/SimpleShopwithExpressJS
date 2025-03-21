const express = require("express");
const {
  createSession,
  getUserSession,
  deleteUserSession,
} = require("../controllers/sessions.controller");

const verifyToken = require("../middleware/verifyToken");

const SessionRouter = express.Router();

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user
 *               ipAddress:
 *                 type: string
 *                 description: The IP address of the user's device
 *               deviceInfo:
 *                 type: string
 *                 description: Information about the user's device
 *     responses:
 *       200:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Bad request. Validation error
 *       401:
 *         description: Unauthorized. Token is missing or invalid
 *       500:
 *         description: Internal server error
 */

SessionRouter.post("/", verifyToken, createSession);

/**
 * @swagger
 * /api/sessions/me:
 *   get:
 *     summary: Get the latest session for the current user
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Session found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */

SessionRouter.get("/me", verifyToken, getUserSession);

/**
 * @swagger
 * /api/sessions/delete:
 *   delete:
 *     summary: Delete the latest session for the current user
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */

SessionRouter.delete("/delete", verifyToken, deleteUserSession);

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the session
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *         ipAddress:
 *           type: string
 *           description: The IP address of the user's device
 *         deviceInfo:
 *           type: string
 *           description: Information about the user's device
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the session was created
 *       example:
 *         id: 1
 *         userId: 1
 *         ipAddress: "192.168.1.1"
 *         deviceInfo: "Chrome on Windows"
 *         createdAt: "2023-10-01T12:34:56Z"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = SessionRouter;
