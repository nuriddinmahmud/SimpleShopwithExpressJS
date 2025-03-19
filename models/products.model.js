const { DataTypes } = require("sequelize");
const {db} = require("../config/database");
const Users = require("./users.model");
const Categories = require("./categories.model");

const Products = db.define("Products", {
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
      model: Categories,
      key: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

Users.hasMany(Products, { foreignKey: "userID" });
Products.belongsTo(Users, { foreignKey: "userID" });

Categories.hasMany(Products, { foreignKey: "categoryID" });
Products.belongsTo(Categories, { foreignKey: "categoryID" });

module.exports = Products;
