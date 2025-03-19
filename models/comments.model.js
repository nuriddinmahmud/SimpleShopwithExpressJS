const Users = require("./users.model.js");
const Products = require("./products.model.js");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

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
    allowNull: false,
    references: {
      model: Users,
      key: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
});

Users.hasMany(Comments, { foreignKey: "userID" });
Comments.belongsTo(Users, { foreignKey: "userID" });

Products.hasMany(Comments, { foreignKey: "productID" });
Comments.belongsTo(Products, { foreignKey: "productID" });

module.exports = Comments;
