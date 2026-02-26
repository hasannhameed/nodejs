const express = require('express');
const sequelize = require('./util/database');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

app.use(bookingRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        await sequelize.sync({ alter: true });
        app.listen(3065, () => console.log('Running on http://localhost:3065/booking-page'));
    } catch (error) {
        console.log(error);
    }
};

startServer();