const {Sequelize, DataTypes} = require("sequelize")

const db = new Sequelize('db', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});


async function connect() {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    // await db.sync({force: true});
}

module.exports = {db, connect, DataTypes}