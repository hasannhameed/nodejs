const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('bus_booking_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});


const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { timestamps: false });

const Bus = sequelize.define('Bus', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    busNumber: { type: DataTypes.STRING, allowNull: false },
    availableSeats: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: false });

const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false }, 
    busId: { type: DataTypes.INTEGER, allowNull: false }, 
    bookingDate: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { timestamps: false });

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false }, 
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' }
}, { timestamps: false });




app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/buses', async (req, res) => {
    try {
        const bus = await Bus.create(req.body);
        res.status(201).json(bus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/buses/available/:seats', async (req, res) => {
    try {
        const minSeats = parseInt(req.params.seats);
        const buses = await Bus.findAll({
            where: {
                availableSeats: {
                    [Op.gt]: minSeats 
                }
            }
        });
        res.json(buses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/bookings', async (req, res) => {
    try {
        const booking = await Booking.create({
            bookingDate: new Date(),
        });
        res.status(201).json({
            message: 'Booking created successfully',
            data: booking
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/payments', async (req, res) => {
    try {
        const payment = await Payment.create({
            bookingId: req.body.bookingId,
            amount: req.body.amount,
            status: req.body.status || 'Pending'
        });
        res.status(201).json({
            message: '💰 Payment record created',
            payment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/payments/:bookingId', async (req, res) => {
    try {
        const payment = await Payment.findOne({
            where: { bookingId: req.params.bookingId }
        });
        if (payment) {
            res.json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Database connected.');

        
        await sequelize.sync({ alter: true });

        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    } catch (error) {
        console.error('Sync Error:', error);
    }
};

startServer();