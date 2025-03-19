const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Sequelize = require('sequelize');
// const mainRouter = require("./routes/main.routes.js")
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const  sequelize  = require('./config/database.js');

dotenv.config();
const PORT = process.env.PORT || 3006;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// app.use('/api', mainRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Salom

async function shop() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database successfully ✅');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
}

shop();
