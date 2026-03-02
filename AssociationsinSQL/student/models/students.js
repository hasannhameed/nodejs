const sequelize = require('../utils/db');
const {DataTypes} = require('sequelize');

const students = sequelize.define('students',{
    id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name: {type:DataTypes.STRING, allowNull:false}
});

module.exports = students;