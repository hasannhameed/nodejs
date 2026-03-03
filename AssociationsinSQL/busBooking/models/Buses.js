const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');

const Buses = sequelize.define('Buses',{
    id:{ 
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
     },
     busNumber:{
        type:DataTypes.STRING,
        allowNull:false
     },
     totalSeats:{
            type:DataTypes.INTEGER,
            allowNull:false
     },
})

module.exports = Buses