const sequelize     = require('../utils/db.js');
const { DataTypes } = require('sequelize');


const Course = sequelize.define('Course',{
    id : {type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name: {type:DataTypes.STRING,allowNull:false}
})

module.exports = Course;