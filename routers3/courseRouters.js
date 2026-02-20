const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'java' }, 
    { id: 2, name: 'python' },
    { id: 3, name: 'js' },
    { id: 4, name: 'php' }
];


router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cours = courses.find(crs => crs.id === id);

    if (!cours) {
        return res.status(404).send("Course not found");
    }
    res.send(cours);
});

router.get('/', (req, res) => {
   
    const courseNames = courses.map(c => c.name).join(", ");
    res.send(`Courses: ${courseNames}`);
});

module.exports = router;