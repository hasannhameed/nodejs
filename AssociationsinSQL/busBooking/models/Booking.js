const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Bookings = sequelize.define('Booking',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    bookingDate:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    seatNumber:{
        type:DataTypes.INTEGER
    },
    status:{
        type:DataTypes.ENUM('confirmed', 'cancelled', 'pending'),
        defaultValue: 'confirmed'}
});

module.exports = Bookings;