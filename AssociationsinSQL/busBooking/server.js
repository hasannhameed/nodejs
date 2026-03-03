
const express       = require('express');
const bookingRoutes = require('./routes/bookingRoutes.js');
const busRoutes     = require('./routes/busRoutes.js');
const userRoutes    = require('./routes/userRoutes.js');
const viewRoutes    = require('./routes/viewRoutes.js');

const app = express();
const post = 3000;
const sequelize = require('./config/database');

app.use(express.json());
app.use('/bus',busRoutes);
app.use('/user',userRoutes);
app.use('/booking',bookingRoutes);
app.use('/view',viewRoutes);

const startServer = async() => {
    try{
         await sequelize.authenticate();
         require('./models/associations');
        //  /await sequelize.sync({ alter: true })
         await app.listen(3000,()=>{
            console.log(`server running at http://localhost:${post}`);
         });
    }catch(error){
        console.log(error.message);
    }
}

startServer();