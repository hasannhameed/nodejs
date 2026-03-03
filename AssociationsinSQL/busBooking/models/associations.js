const Buses = require('./Buses.js');
const Users = require('./Users.js');
const Bookings = require('./Booking.js');

Users.hasMany(Bookings,{foreignKey:'userId',onDelete:'CASCADE'})
Bookings.belongsTo(Users,{foreignKey:"userId"});

Buses.hasMany(Bookings,{foreignKey:"busId",onDelete:'CASCADE'});
Bookings.belongsTo(Buses,{foreignKey:"busId"});

module.exports = {
    Bookings,
    Buses,
    Users
}