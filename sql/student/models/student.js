const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection.js');

const Student = sequelize.define('Student',{
    id : {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNULL:false
    }
});

async function syncfunction(){
    try{
        await sequelize.sync();
        console.log('success !');
    }catch(error){
        console.log(error);
    }
    
}
syncfunction();

module.exports = Student;