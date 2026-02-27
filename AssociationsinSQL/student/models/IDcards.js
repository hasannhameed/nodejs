const sequelize = require('../utils/db')
const {DataTypes} = require('sequelize');

const IDcards = sequelize.define('IDcards',{
    id:{
        type:DataTypes.INTEGER,
         primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    cardNumber:{
        type:DataTypes.INTEGER
    },
})

module.exports = IDcards