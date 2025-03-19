const {db, DataTypes} = require("../config/database")

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
        allowNull: false
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = OrdersItem