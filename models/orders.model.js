<<<<<<< HEAD
const { db, DataTypes } = require("../config/database");
=======
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");  // Correct import
>>>>>>> 6223b77924741775dd44cc81e70f403de62e81e3
const Users = require("./users.model");

const Orders = sequelize.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
});

Users.hasMany(Orders, { foreignKey: "userID" });
Orders.belongsTo(Users, { foreignKey: "userID" });

module.exports = Orders;
