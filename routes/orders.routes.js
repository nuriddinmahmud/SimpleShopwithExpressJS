const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders.controller");

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/rolePolice");

const OrderRouter = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: integer
 *         description: Filter orders by user ID
 *     responses:
 *       200:
 *         description: List of all orders
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Barcha buyurtmalarni olish (filtr, sort, pagination)
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Mahsulot nomi bo‘yicha filtr
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Saralash tartibi (asc - o‘sish bo‘yicha, desc - kamayish bo‘yicha)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Har bir sahifadagi elementlar soni
 *     responses:
 *       200:
 *         description: Buyurtmalar ro‘yxati qaytarildi
 *       400:
 *         description: Noto‘g‘ri so‘rov parametrlari
 *       401:
 *         description: Ruxsatsiz foydalanuvchi
 */
OrderRouter.get("/", verifyToken, getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Bitta buyurtmani olish
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Buyurtma ID'si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buyurtma topildi va qaytarildi
 *       404:
 *         description: Buyurtma topilmadi
 */
OrderRouter.get("/:id", verifyToken, getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Yangi buyurtma yaratish
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: Foydalanuvchi ID'si
 *     responses:
 *       201:
 *         description: Buyurtma muvaffaqiyatli yaratildi
 *       400:
 *         description: Yaroqsiz ma’lumotlar
 */
OrderRouter.post("/", verifyToken, checkRole(["Admin"]), createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Buyurtmani yangilash
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Buyurtma ID'si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 description: Foydalanuvchi ID'si
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto‘g‘ri so‘rov ma’lumotlari
 *       404:
 *         description: Buyurtma topilmadi
 */
OrderRouter.patch(
  "/:id",
  verifyToken,
  checkRole(["Admin", "SuperAdmin"]),
  updateOrder
);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Buyurtmani o‘chirish
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Buyurtma ID'si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buyurtma muvaffaqiyatli o‘chirildi
 *       403:
 *         description: Ruxsatsiz foydalanuvchi (faqat adminlar o‘chira oladi)
 *       404:
 *         description: Buyurtma topilmadi
 */
OrderRouter.delete("/:id", verifyToken, checkRole(["Admin"]), deleteOrder);

module.exports = OrderRouter;
