const express = require('express');
const userRout = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const db = require('./utils/db');
const app = express();

app.use(express.json());

app.use('/api',userRout);
app.use('/api2',courseRoutes);

require('./models/index');

const startServer = async () =>{
    await db.authenticate();
    await db.sync({alter:true})
    console.log('Registered Models:', db.models);

    await app.listen(3010,()=>{
        console.log('server started at http://localhost:3010/api2/course');
    })
}

startServer();