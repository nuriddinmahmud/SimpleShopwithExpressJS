<<<<<<< HEAD
const {db, DataTypes} = require("../config/database")
const Users = require('./users.model')
=======
const { db, DataTypes } = require("../config/database");
const Users = require("./users.model");
>>>>>>> a0ed6d19695b00ed39bf85aaf6497593e4b25608

const Orders = db.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
        references: {
            model: Users,
            key: "id",
        },
    }
})

Users.hasMany(Orders, {foreignKey: "userID"})
Orders.belongsTo(Users, {foreignKey: "userID"})

module.exports = Orders
=======
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
>>>>>>> a0ed6d19695b00ed39bf85aaf6497593e4b25608
