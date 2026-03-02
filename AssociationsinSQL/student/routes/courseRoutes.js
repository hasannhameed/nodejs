const express = require('express');
const router = express.Router();
const courses = require('../controller/courses');

router.get('/student/:id', courses.getUser);      
router.get('/student', courses.getallUsers);     
router.post('/student', courses.postUser);       
router.put('/student/:id', courses.putUser);     
router.delete('/student/:id', courses.deleteUser); 
router.delete('/student', courses.deleteAllUser); 

router.get('/course/:id', courses.getCourse);      
router.get('/course', courses.getallCourse);      
router.post('/course', courses.postCourse);        
router.put('/course/:id', courses.putCourse);      
router.delete('/course/:id', courses.deleteCourse); 
router.delete('/course', courses.deleteAllCourse); 

module.exports = router;    