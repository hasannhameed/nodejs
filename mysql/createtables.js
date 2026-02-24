const mysql = require('mysql2/promise');

const CreateConnection = async() => {
    const connection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'store_db'
    })
    try{
        console.log('Connected creating tables...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            )
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Buses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                busNumber VARCHAR(255) NOT NULL UNIQUE,
                totalSeats INT NOT NULL,
                availableSeats INT NOT NULL
            )
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                seatNumber INT NOT NULL
            )
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Payments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                amountPaid DECIMAL(10, 2) NOT NULL,
                paymentStatus VARCHAR(50) NOT NULL DEFAULT 'Pending'
            )
        `); 
        console.log("All tables created successfully!");
    }catch(error){
        console.error("Error creating tables:", error.message);
    } finally {
        await connection.end();
    }
}

CreateConnection();