const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Users = require("./users.model");
const Products = require("./products.model");

const Comments = sequelize.define("Comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  markedStar: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    allowNull: false,
  },
  productID: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: "id",
    },
    allowNull: false,
  },
});

Users.hasMany(Comments, { foreignKey: "userID" });
Comments.belongsTo(Users, { foreignKey: "userID" });

Products.hasMany(Comments, { foreignKey: "productID" });
Comments.belongsTo(Products, { foreignKey: "productID" });

module.exports = Comments;
