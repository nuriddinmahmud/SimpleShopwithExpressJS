const {db, DataTypes} = require("../config/database")
const Orders = require("./orders.model")
const Products = require("./products.model")

const OrdersItem = db.define("OrdersItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    count:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'id'
        }
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id'
        }
    }
})

OrdersItem.belongsTo(Orders, {foreignKey: 'orderID'})
OrdersItem.belongsTo(Products, {foreignKey: 'productID'})



module.exports = OrdersItem