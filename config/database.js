const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
<<<<<<< HEAD
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "0901",
  database: "dr",
=======
  dialect: "mysql", 
  host: "localhost",  
  username: "root",   
  password: "12345678",   
  database: "db",  
>>>>>>> 51bcae8c7fd3e910da6261a85ca88062f4ff935f
});

module.exports = sequelize;