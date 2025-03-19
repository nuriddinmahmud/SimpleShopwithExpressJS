const { sequelize, DataTypes } = require("../config/database.js");
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
        isNumeric: true,
      },
    },
    role: {
      type: DataTypes.ENUM("Admin", "User", "Seller", "SuperAdmin"),
      allowNull: false,
      defaultValue: "User",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
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
        model: Regions,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  { timestamps: true }
);

Users.belongsTo(Regions, { foreignKey: "regionID" });
Regions.hasMany(Users, { foreignKey: "regionID" });

module.exports = Users;
