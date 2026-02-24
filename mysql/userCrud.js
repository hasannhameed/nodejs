const express = require('express');
const mysql = require('mysql2/promise'); 
const app = express();

app.use(express.json());



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'store_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0  
});




app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.execute('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email]);
        console.log(`User inserted: ${name} (ID: ${result.insertId})`);
        res.status(201).json({ id: result.insertId, name, email });
    } catch(err) {
        console.error('Database Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Users');
        res.status(200).json(rows);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.execute('DELETE FROM Users WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
        
        console.log(`Deleted ID: ${id}`);
        res.status(200).json({ message: "User deleted" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    try {
        const [result] = await pool.execute('UPDATE Users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });

        console.log(`Updated ID: ${id}`);
        res.status(200).json({ message: "User updated" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3033, () => console.log('Server running on port 3033'));