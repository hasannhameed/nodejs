const sequelize = require('../utils/db.js')
const {DataTypes} = require('sequelize');

const Users = sequelize.define('Users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Users