const user = require('./users');
const IDcards = require('./IDcards');

user.hasOne(IDcards, { foreignKey: 'userId', onDelete: 'CASCADE' });
IDcards.belongsTo(user, { foreignKey: 'userId' });

module.exports = { user, IDcards };