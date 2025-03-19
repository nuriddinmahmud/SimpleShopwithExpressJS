const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Regions = sequelize.define("Regions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Regions;