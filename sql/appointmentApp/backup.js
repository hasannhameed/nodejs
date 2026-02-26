const express = require('express');
const path = require('path');

const getHtmlForm = () => {
    return path.join(__dirname,'view','view.html');
}

const {Sequelize, DataTypes, Op} = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('store_db','root','',{
    host:'localhost',
    dialect:"mysql"
})

const Booking = sequelize.define('Booking',{
    id: {type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
    name: {type:DataTypes.STRING, allowNull: false},
    email: {type:DataTypes.STRING, allowNull: false}
});


app.get('/booking-page', async (req, res) => {
    res.status(200).sendFile(getHtmlForm())
})

app.get('/booking', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/booking/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await Booking.findOne({ where: { id: bookingId } });
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/booking', async (req,res)=>{
    try{
        const booking = req.body;
        const newBooking = await Booking.create(booking);
        res.status(200).json(newBooking)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


const startServer = async () => {
    try{
        await sequelize.authenticate();
        console.log('database connected');

        await sequelize.sync( {alter: true} );

        app.listen(30062,()=>{
            console.log('app running on http://localhost:3062/booking');
        })

    }catch(error){
        console.log(error);
    }
}

startServer();