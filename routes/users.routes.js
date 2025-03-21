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
  getNewAccessToken,
  sendOtpPhone,
  verifyOtpPhone
} = require("../controllers/users.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const checkRole = require("../middleware/rolePolice.js");
const selfPolice = require("../middleware/selfPolice.js");

const UsersRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - yearOfBirth
 *         - email
 *         - password
 *         - phone
 *         - role
 *         - regionID
 *       properties:
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         yearOfBirth:
 *           type: integer
 *           example: 1995
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "SecurePass123!"
 *         phone:
 *           type: string
 *           example: "+998901234567"
 *         role:
 *           type: string
 *           enum: ["Admin", "User", "Seller", "SuperAdmin"]
 *           example: "User"
 *         avatar:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/avatar.jpg"
 *         status:
 *           type: string
 *           enum: ["Active", "Inactive"]
 *           default: "Inactive"
 *           example: "Inactive"
 *         regionID:
 *           type: integer
 *           example: 1
 *       example:
 *         fullName: "John Doe"
 *         yearOfBirth: 1995
 *         email: "user@example.com"
 *         password: "SecurePass123!"
 *         phone: "+998901234567"
 *         role: "User/Admin/Super-Admin/Seller"
 *         avatar: "https://example.com/avatar.jpg"
 *         status: "Inactive"
 *         regionID: 1
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: This account already exists
 */
UsersRouter.post("/register", register);
UsersRouter.post("/send-otp-phone", sendOtpPhone); // documentyatiyaga qoshish kere
UsersRouter.post("/verify-otp-phone", verifyOtpPhone); // documentyatiyaga qoshish kere

/**
 * @swagger
 * /api/users/verify-otp:
 *   post:
 *     summary: Verify OTP for user activation
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *               regionID:
 *                 type: integer
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *               yearOfBirth:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User activated successfully
 *       405:
 *         description: Incorrect email or OTP
 */
UsersRouter.post("/verify-otp", verifyOtp);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       422:
 *         description: Invalid email or password
 */
UsersRouter.post("/login", login);

/**
 * @swagger
 * /api/users/get-access-token:
 *   post:
 *     summary: Get a new access token using refresh token
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: New access token generated successfully
 */
UsersRouter.post("/get-access-token", getNewAccessToken);

/**
 * @swagger
 * /api/users/promoteToAdmin/{id}:
 *   patch:
 *     summary: Promote a user to admin
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User promoted successfully
 */
UsersRouter.patch(
  "/promoteToAdmin/:id",
  verifyToken,
  selfPolice(["Admin"]),
  promoteToAdmin
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
UsersRouter.get(
  "/",
  verifyToken,
  checkRole(["Admin", "User", "Seller", "SuperAdmin"]),
  findAll
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
UsersRouter.get(
  "/:id",
  verifyToken,
  checkRole(["Admin", "User", "Seller", "SuperAdmin"]),
  findOne
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
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
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
UsersRouter.patch("/:id", verifyToken, selfPolice(["Admin"]), update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
UsersRouter.delete("/:id", verifyToken, selfPolice(["Admin"]), remove);

module.exports = UsersRouter;
