const express = require("express");
const {
  getUserSession,
  deleteUserSession,
} = require("../controllers/sessions.controller");
const verifyToken = require("../middleware/verifyToken");
const SessionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Session
 *   description: User session management
 */

/**
 * @swagger
 * /api/sessions/me:
 *   get:
 *     summary: Get current session
 *     description: Retrieves the latest session for the authenticated user.
 *     tags: [Session]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 ipAddress:
 *                   type: string
 *                   example: "192.168.1.1"
 *                 deviceInfo:
 *                   type: string
 *                   example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:34:56Z"
 *       401:
 *         description: Unauthorized (invalid or missing token)
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
 *     summary: Delete current session
 *     description: Deletes the latest session for the authenticated user.
 *     tags: [Session]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session deleted successfully"
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error
 */

SessionRouter.delete("/delete", verifyToken, deleteUserSession);

module.exports = SessionRouter;
