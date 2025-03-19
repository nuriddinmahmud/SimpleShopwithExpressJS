<<<<<<< HEAD
const express = require("express")
const app = express()








app.listen(3000, ()=>console.log("Server started"))
=======
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const mainRoute = require("./routes/index.js");
const { sequelize } = require('./config/database.js');

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
>>>>>>> 68cbd5b9493f61ef2760d9d419b2f8d6416de8bc
