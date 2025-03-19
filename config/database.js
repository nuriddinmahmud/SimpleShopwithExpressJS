const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql", 
  host: "localhost",  
  username: "root",   
  password: "1234",   
  database: "mock",  
});

module.exports = sequelize; 
