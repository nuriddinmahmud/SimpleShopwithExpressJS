const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Users = require("./users.model");

const Orders = sequelize.define(
  "Orders",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
  },
  { timestamps: false }
);

Users.hasMany(Orders, { foreignKey: "userID" });
Orders.belongsTo(Users, { foreignKey: "userID" });

module.exports = Orders;
