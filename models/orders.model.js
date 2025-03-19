const {db, DataTypes} = require("../config/database")

const Orders = db.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Orders