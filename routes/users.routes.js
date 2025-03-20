const express = require("express");
const {
  register,
  verifyOtp,
  login,
  findAll,
  update,
  remove,
  promoteToAdmin,
  findOne,
  getNewAccessToken
} = require("../controllers/users.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const checkRole = require("../middleware/rolePolice.js");
const selfPolice = require("../middleware/selfPolice.js");

const UsersRouter = express.Router();

UsersRouter.post("/register", register);
UsersRouter.post("/verify-otp", verifyOtp);
UsersRouter.post("/login", login);
UsersRouter.post("/get-access-token", getNewAccessToken);
UsersRouter.patch(
  "/promoteToAdmin/:id",
  verifyToken,
  selfPolice(["Admin"]),
  promoteToAdmin
);
UsersRouter.get(
  "/",
  verifyToken,
  checkRole(["Admin", "User", "Seller", "SuperAdmin"]),
  findAll
);
UsersRouter.get(
  "/:id",
  verifyToken,
  checkRole(["Admin", "User", "Seller", "SuperAdmin"]),
  findOne
);
UsersRouter.patch("/:id", verifyToken, selfPolice(["Admin"]), update);
UsersRouter.delete("/:id", verifyToken, selfPolice(["Admin"]), remove);

module.exports = UsersRouter;
