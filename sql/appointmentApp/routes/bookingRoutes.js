const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/booking-page', bookingController.getBookingPage);
router.get('/booking', bookingController.getAllBookings);
router.post('/booking', bookingController.postBooking);

module.exports = router;