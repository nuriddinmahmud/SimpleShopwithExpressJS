const { db, DataTypes } = require("../config/database");
const Orders = require("./orders.model");
const Products = require("./products.model");

const OrdersItem = db.define("OrdersItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
});


OrdersItem.belongsTo(Orders, { foreignKey: "orderID" });
OrdersItem.belongsTo(Products, { foreignKey: "productID" });

Orders.hasMany(OrdersItem, { foreignKey: "orderID" });
Products.hasMany(OrdersItem, { foreignKey: "productID" });

module.exports = OrdersItem;
