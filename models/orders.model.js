const {db, DataTypes} = require("../config/database")
const Users = require('./users.model')

const Orders = db.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: "id",
        },
    }
})

Users.hasMany(Orders, {foreignKey: "userID"})
Orders.belongsTo(Users, {foreignKey: "userID"})

module.exports = Orders