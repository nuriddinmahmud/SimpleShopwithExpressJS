<<<<<<< HEAD
const {db, DataTypes} = require("../config/database")
const Orders = require("./orders.model")
const Products = require("./products.model")
=======
const { db, DataTypes } = require("../config/database");
const Orders = require("./orders.model");
const Products = require("./products.model");
>>>>>>> a0ed6d19695b00ed39bf85aaf6497593e4b25608

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
<<<<<<< HEAD
            key: 'id'
        }
=======
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
>>>>>>> a0ed6d19695b00ed39bf85aaf6497593e4b25608
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
<<<<<<< HEAD
            key: 'id'
        }
=======
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
>>>>>>> a0ed6d19695b00ed39bf85aaf6497593e4b25608
    }
});

<<<<<<< HEAD
OrdersItem.belongsTo(Orders, {foreignKey: 'orderID'})
OrdersItem.belongsTo(Products, {foreignKey: 'productID'})


=======
Orders.belongsToMany(Products, { through: OrdersItem, foreignKey: "orderID" });
Products.belongsToMany(Orders, { through: OrdersItem, foreignKey: "productID" });
>>>>>>> a0ed6d19695b00ed39bf85aaf6497593e4b25608

OrdersItem.belongsTo(Orders, { foreignKey: "orderID" });
OrdersItem.belongsTo(Products, { foreignKey: "productID" });

Orders.hasMany(OrdersItem, { foreignKey: "orderID" });
Products.hasMany(OrdersItem, { foreignKey: "productID" });

module.exports = OrdersItem;
