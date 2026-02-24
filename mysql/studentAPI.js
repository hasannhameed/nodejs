const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'store_db', 
});


app.post('/students', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO students (name, email, age) VALUES (?, ?, ?)', 
            [name, email, age]
        );
        console.log(`INSERT: Student ${name} added (ID: ${result.insertId})`);
        res.status(201).json({ id: result.insertId, name, email, age });
    } catch (err) {
        console.error('INSERT ERROR:', err.message);
        res.status(500).json({ error: err.message });
    }
});


app.get('/students', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM students');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const [result] = await pool.execute(
            'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?', 
            [name, email, age, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
        
        console.log(`UPDATE: Student ID ${id} updated to ${name}`);
        res.status(200).json({ message: "Student updated successfully" });
    } catch (err) {
        console.error('UPDATE ERROR:', err.message);
        res.status(500).json({ error: err.message });
    }
});


app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM students WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });

        console.log(`DELETE: Student ID ${id} removed`);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error('DELETE ERROR:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(4000, () => console.log('Student API running on port 4000'));