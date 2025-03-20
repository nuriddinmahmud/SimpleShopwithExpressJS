const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Sequelize = require("sequelize");
const mainRouter = require("./routes/main.routes.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./config/database.js");
const multer = require("multer");
const path = require("path");

dotenv.config();
const PORT = process.env.PORT || 3006;

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
<<<<<<< HEAD
        url: "http://localhost:3006",
        description: "Local server",
=======
        url: `http://localhost:${PORT}`,
>>>>>>> 0822e45a8c2f4a1c1a2927662daac7d1110e36f3
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "index.js"],
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image file and returns its URL.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The URL of the uploaded image.
 *                   example: "http://localhost:3006/image/filename.jpg"
 *       400:
 *         description: Bad request. No file uploaded or invalid file type.
 *       500:
 *         description: Internal server error.
 */
app.use("/upload", upload.single("image"), (req, res) => {
  res.send({ url: `http://localhost:3006/image/${req.file.filename}` });
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/image", express.static("uploads"));
app.use("/api", mainRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function shop() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully ✅");
    // await sequelize.sync({force: true})
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
}

shop();
