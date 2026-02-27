const User = require('./users');
const IDcards = require('./IDcards');

User.hasOne(IDcards,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
    foreignKey: 'UserId'
})
IDcards.belongsTo(User, {
    foreignKey: 'UserId'
});

module.exports = { User, IDcards };