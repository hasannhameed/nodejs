const User = require('./users');
const IDcards = require('./IDcards');

User.hasMany(IDcards,{
    onDelete:'CASCADE',
    foreignKey: 'UserId'
})
IDcards.belongsTo(User, {
    foreignKey: 'UserId'
});

module.exports = { User, IDcards };