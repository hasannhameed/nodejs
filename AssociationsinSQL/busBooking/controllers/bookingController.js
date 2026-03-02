const {Users,Bookings,Buses} = require('../models/associations');


const getBooking = async(req, res) => {
    try{
        const bookingId = req.params.id;
        const booking = await Buses.findByPk(bookingId);
        if(!booking){
            return res.status(500).json({"message":"Booking not fount"});
        }
        res.status(200).json(booking);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}
const getBookings = async(req, res) => {
     try{
        const bookings = await Buses.findAll();
        if(booking.length == 0 ){
            return res.status(500).json({"message":"Bookings not fount"});
        }
        res.status(200).json(bookings);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}
const postBooking = async(req, res) => {
    res.status(200).json({"status":"working post booking"})
}
const putBooking = async(req, res) => {
    res.status(200).json({"status":"working put booking"})
}
const deleteBooking = async(req, res) => {
    res.status(200).json({"status":"working delete booking"})
}

module.exports = {
    getBooking,
    getBookings,
    postBooking,
    putBooking,
    deleteBooking
}
