const Booking = require('../models/booking');
const path = require('path');

exports.getBookingPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'view.html'));
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.postBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};