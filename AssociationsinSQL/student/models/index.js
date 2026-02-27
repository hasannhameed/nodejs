const user = require('./users');
const Post = require('./Post');

user.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(user, { foreignKey: 'userId' });

module.exports = { user, Post };