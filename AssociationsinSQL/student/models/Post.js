const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT }
});

module.exports = Post;