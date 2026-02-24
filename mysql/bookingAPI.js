const express = require('express');
const mysql = require('mysql2/promise'); 
const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_db'
});

app.get('/users', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM Users'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


app.post('/buses', async (req, res) => {
    try {
        const { busNumber, totalSeats, availableSeats } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)', 
            [busNumber, totalSeats, availableSeats]
        );

        console.log(`Bus added: ${busNumber} (ID: ${result.insertId})`);
        
        res.status(201).json({ 
            id: result.insertId, 
            busNumber, 
            totalSeats, 
            availableSeats 
        });
    } catch (error) {
        console.error('Error adding bus:', error.message);
        res.status(500).json({ error: "Failed to add bus" });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await pool.query(`INSERT INTO Users (name, email) VALUES (?, ?)`, [name, email]);
        
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to insert user" });
    }
});


app.get('/buses/available/:seats', async (req, res) => {
    const seats = req.params.seats;
    try {
        const [buses] = await pool.query('SELECT * FROM Buses WHERE availableSeats > ?', [seats]);
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4000, () => console.log('Server running on port 4000'));