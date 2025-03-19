const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('mock', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = {sequelize, DataTypes}