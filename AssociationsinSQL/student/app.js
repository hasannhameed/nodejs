const express = require('express');
const studentRout = require('./routes/studentRoutes');

const db = require('./utils/db');

const app = express();

app.use(express.json());

app.use('/api',studentRout);

require('./models/index');

const startServer = async () =>{
    await db.authenticate();
    await db.sync({alter:true})
    console.log('Registered Models:', db.models);

    await app.listen(3005,()=>{
        console.log('server started at http://localhost:3005/api/user');
    })
}

startServer();