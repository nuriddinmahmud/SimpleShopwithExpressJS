const express = require("express");
const {
  register,
  verifyOtp,
  login,
  findOne,
  findAll,
  update,
  remove,
  promoteToAdmin,
  getNewAccessToken,
  sendOtpPhone,
  verifyOtpPhone,
} = require("../controllers/users.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const selfPolice = require("../middleware/selfPolice.js");

const UsersRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
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
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               yearOfBirth:
 *                 type: integer
 *                 description: The year of birth of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *               role:
 *                 type: string
 *                 enum: [Admin, User, Seller, SuperAdmin]
 *                 description: The role of the user (default is "User")
 *               avatar:
 *                 type: string
 *                 description: The avatar URL of the user
 *               regionID:
 *                 type: integer
 *                 description: The ID of the region the user belongs to
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Validation error
 *       405:
 *         description: Account already exists
 *       500:
 *         description: Internal server error
 */

UsersRouter.post("/register", register);

/**
 * @swagger
 * /api/users/verify-otp:
 *   post:
 *     summary: Verify OTP for account activation
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
 *         description: Account activated successfully
 *       403:
 *         description: OTP is incorrect
 *       405:
 *         description: Email is incorrect
 *       500:
 *         description: Internal server error
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
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       403:
 *         description: Account not activated
 *       422:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

UsersRouter.post("/login", login);

/**
 * @swagger
 * /api/users/get-access-token:
 *   post:
 *     summary: Get a new access token using a refresh token
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UsersRouter.post("/get-access-token", getNewAccessToken);

/**
 * @swagger
 * /api/users/promoteToAdmin/{id}:
 *   patch:
 *     summary: Promote a user to admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to promote
 *     responses:
 *       200:
 *         description: User promoted to admin successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

UsersRouter.patch("/promoteToAdmin/:id", promoteToAdmin);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized user type
 *       500:
 *         description: Internal server error
 */

UsersRouter.get("/", findAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UsersRouter.get("/:id", findOne);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user by ID (Admin or SuperAdmin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The updated full name of the user
 *               yearOfBirth:
 *                 type: integer
 *                 description: The updated year of birth of the user
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *               password:
 *                 type: string
 *                 description: The updated password of the user
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the user
 *               role:
 *                 type: string
 *                 enum: [Admin, User, Seller, SuperAdmin]
 *                 description: The updated role of the user
 *               avatar:
 *                 type: string
 *                 description: The updated avatar URL of the user
 *               regionID:
 *                 type: integer
 *                 description: The updated ID of the region the user belongs to
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Only SuperAdmin can update users
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UsersRouter.patch(
  "/:id",
  verifyToken,
  selfPolice(["Admin", "SuperAdmin"]),
  update
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Nobody can destroy admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UsersRouter.delete("/:id", verifyToken, selfPolice(["Admin"]), remove);

/**
 * @swagger
 * /api/users/send-otp-phone:
 *   post:
 *     summary: Send OTP to user's phone
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UsersRouter.post("/send-otp-phone", sendOtpPhone);

/**
 * @swagger
 * /api/users/verify-otp-phone:
 *   post:
 *     summary: Verify OTP sent to user's phone
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's phone
 *     responses:
 *       200:
 *         description: Account activated successfully
 *       403:
 *         description: OTP is incorrect
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

UsersRouter.post("/verify-otp-phone", verifyOtpPhone);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         yearOfBirth:
 *           type: integer
 *           description: The year of birth of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         role:
 *           type: string
 *           enum: [Admin, User, Seller, SuperAdmin]
 *           description: The role of the user
 *         avatar:
 *           type: string
 *           description: The avatar URL of the user
 *         status:
 *           type: string
 *           enum: [Active, Inactive]
 *           description: The status of the user
 *         regionID:
 *           type: integer
 *           description: The ID of the region the user belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 *         Region:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *       example:
 *         id: 1
 *         fullName: "John Doe"
 *         yearOfBirth: 1990
 *         email: "john.doe@example.com"
 *         password: "hashedPassword"
 *         phone: "1234567890"
 *         role: "User"
 *         avatar: "http://example.com/avatar.jpg"
 *         status: "Active"
 *         regionID: 1
 *         createdAt: "2023-10-01T12:34:56Z"
 *         updatedAt: "2023-10-01T12:34:56Z"
 *         Region:
 *           id: 1
 *           name: "Tashkent"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = UsersRouter;
