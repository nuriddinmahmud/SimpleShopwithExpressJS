const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",  // or "postgres", "sqlite", etc.
  host: "localhost",  // Change to your DB host
  username: "root",   // Your DB username
  password: "1234",   // Your DB password
  database: "mock",   // Your DB name
});

module.exports = sequelize; // Export sequelize instance
