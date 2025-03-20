const express = require("express");
const {
  createSession,
  getUserSession,
  deleteUserSession,
} = require("../controllers/session.controller");

const verifyToken = require("../middleware/verifyToken");

const SessionRouter = express.Router();

SessionRouter.post("/", verifyToken, createSession);
SessionRouter.get("/me", verifyToken, getUserSession);
SessionRouter.delete("/delete", verifyToken, deleteUserSession);

module.exports = SessionRouter;
