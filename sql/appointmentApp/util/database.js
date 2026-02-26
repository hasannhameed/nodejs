const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;