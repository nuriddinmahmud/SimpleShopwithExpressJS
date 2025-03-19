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
    references: {
      model: Users,
      key: "id",
    },
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    references: {
      model: Categories,
      key: "id",
    },
    allowNull: false,
  },
});

Users.hasMany(Products, { foreignKey: "userID" });
Products.belongsTo(Users, { foreignKey: "userID" });

Categories.hasMany(Products, { foreignKey: "categoryID" });
Products.belongsTo(Categories, { foreignKey: "categoryID" });

module.exports = Products;
