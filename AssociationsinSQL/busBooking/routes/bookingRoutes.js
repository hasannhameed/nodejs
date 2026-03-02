const express = require('express');
const router = express.Router();
const controllers = require('../controllers/bookingController')

router.get('/',controllers.getBooking)
router.get('/:id',controllers.getBookings)
router.post('/',controllers.postBooking)
router.delete('/:id',controllers.deleteBooking)
router.put('/:id',controllers.putBooking)

module.exports = router;