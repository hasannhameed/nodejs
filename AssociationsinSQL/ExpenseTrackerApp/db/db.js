    const { Sequelize} = require('sequelize');
    const db = new Sequelize('Expense','root','',{
        host:'localhost',
        dialect:'mysql'
    })
   module.exports = db;