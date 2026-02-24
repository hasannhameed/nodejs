const mysql = require('mysql2/promise');

async function connectToDatabase() {
    try {
        
        const connection = await mysql.createConnection({
            host: 'localhost',     
            user: 'root',          
            password: 'your_password', 
            database: 'store_db'   
        });

        console.log('Successfully connected to MySQL!');

        
        const [rows, fields] = await connection.execute('SELECT * FROM Products');
        
        console.log('Data retrieved:', rows);
        
        await connection.end();

    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

connectToDatabase();