const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const Regions = require("./regions.model.js");

const Users = sequelize.define(
  "Users",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearOfBirth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true, // Telefon raqami faqat raqamlardan iborat bo‘lishini tekshirish
      },
    },
    role: {
      type: DataTypes.ENUM("Admin", "User", "Seller", "SuperAdmin"),
      allowNull: false,
      defaultValue: "User", // Default qiymat berish
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, // Avatar bo‘lmasligi mumkin
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: true,
      defaultValue: "Inactive",
    },
    regionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Regions, // Foreign key bo'lishi kerak
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { timestamps: true }
);

module.exports = Users;
