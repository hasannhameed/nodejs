const User = require('./users');
const IDcards = require('./IDcards');

User.belongsToMany(IDcards,{
    through: 'UserCourses',
    foreignKey: 'userId'
})
IDcards.belongsToMany(User, {
    through: 'UserCourses',
    foreignKey: 'userId'
});

module.exports = { User, IDcards };