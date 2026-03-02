const user = require('./users');
const IDcards = require('./IDcards');
const Students = require('./students');
const Course = require('./Course.js');

// --- One-to-One: User & IDcard ---
user.hasOne(IDcards, { foreignKey: 'userId', onDelete: 'CASCADE' });
IDcards.belongsTo(user, { foreignKey: 'userId' });


// --- Many-to-Many: Students & Courses ---

Students.belongsToMany(Course, { through: 'StudentCourses' ,onDelete: 'CASCADE'});
Course.belongsToMany(Students, { through: 'StudentCourses' ,onDelete: 'CASCADE'});


module.exports = { 
    user, 
    IDcards,
    Students,
    Course
};