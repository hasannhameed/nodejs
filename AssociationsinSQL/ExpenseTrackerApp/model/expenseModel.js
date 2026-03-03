 
 const {DataTypes} = require('sequelize');
 const db = require('../db/db');
 //model
    const Expense = db.define('expense',{
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        description:{type:DataTypes.STRING, allowNull:false},
        amount:{type:DataTypes.FLOAT, allowNull:false},
        date:{type:DataTypes.DATE, allowNull:false}
    })

module.exports = Expense;