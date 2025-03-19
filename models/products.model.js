const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Correct import
const Category = require("./category.model"); // Correct path
const Users = require("./users.model");

const Products = sequelize.define("Products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  star: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

Users.hasMany(Products, { foreignKey: "userID" });
Products.belongsTo(Users, { foreignKey: "userID" });

Category.hasMany(Products, { foreignKey: "categoryID" });
Products.belongsTo(Category, { foreignKey: "categoryID" });

module.exports = Products;
