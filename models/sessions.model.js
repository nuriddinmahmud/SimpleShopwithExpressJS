const { DataTypes } = require("sequelize");
<<<<<<< HEAD
const sequelize = require("../config/database.js");

const Session = sequelize.define(
  "Session",
=======
const sequelize = require("../config/database");

const Session = sequelize.define(
  "Sessions",
>>>>>>> f964b36679dd47467571817c97f574e6795d8df6
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deviceInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

module.exports = Session;