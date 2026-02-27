const sequelize = require('../utils/db')
const {DataTypes} = require('sequelize');

const IDcards = sequelize.define('IDcards',{
    id:{
        type:DataTypes.INTEGER,autoIncrement: true,primaryKey:true
    },
    cours:{
        type:DataTypes.STRING
    },
})

module.exports = IDcards