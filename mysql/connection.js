const mysql = require('mysql2/promise');

const createConnection  = async() =>{
    try{
        const connection = await mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'store_db'
        });
        console.log('connection successfull');
        const [rows] = await connection.execute('SELECT * FROM Products');
        console.log(rows);
    }catch(Error){
        console.log(Error);
    }
}

createConnection();