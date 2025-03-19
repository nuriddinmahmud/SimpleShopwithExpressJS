const {db, DataTypes} = require("../config/database")

const Category = db.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
    },
    image:{
        type: DataTypes.STRING,
    }
})

module.exports = Category;