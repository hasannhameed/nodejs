const express = require('express');
const router = express.Router();
const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];
 router.get('/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    const student = students.find(st=>st.id === id);
      if (!student) {
        return res.status(404).send("student not found");
    }
    
    res.send(student);
 });
 router.get('/',(req,res)=>{
    const names  = students.map(st=>st.name).join(',');
    res.send(names)
 });

 module.exports = router;