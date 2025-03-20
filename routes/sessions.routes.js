const express = require("express");
const {
  createSession,
  getUserSession,
  deleteUserSession,
} = require("../controllers/sessions.controller.js");

const verifyToken = require("../middleware/verifyToken");

const SessionRouter = express.Router();

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new session
 *     security:
 *       - BearerAuth: []
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created session
 *       422:
 *         description: Validation error
 */
SessionRouter.post("/", verifyToken, createSession);

/**
 * @swagger
 * /sessions/me:
 *   get:
 *     summary: Get the latest user session
 *     security:
 *       - BearerAuth: []
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Successfully retrieved session
 *       404:
 *         description: Session not found
 */
SessionRouter.get("/me", verifyToken, getUserSession);

/**
 * @swagger
 * /sessions/delete:
 *   delete:
 *     summary: Delete the latest user session
 *     security:
 *       - BearerAuth: []
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Successfully deleted session
 *       404:
 *         description: Session not found
 */
SessionRouter.delete("/delete", verifyToken, deleteUserSession);

module.exports = SessionRouter;
