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

CommentRouter.post(
  "/",
  verifyToken,
  selfPolice(["Admin", "User", "Seller", "SuperAdmin"]),
  create
);

CommentRouter.get("/", getAll);

CommentRouter.get("/:id", getOne);

CommentRouter.patch("/:id", verifyToken, checkRole(["Admin"]), update);

CommentRouter.delete("/:id", verifyToken, checkRole(["Admin"]), remove);

module.exports = CommentRouter;
