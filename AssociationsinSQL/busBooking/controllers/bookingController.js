const {Users,Bookings,Buses} = require('../models/associations');

const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const booking = await Bookings.findByPk(bookingId, {
            include: [
                { model: Users}, 
                { model: Buses}
            ]
        });

        if (!booking) {
            return res.status(404).json({ "message": "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const getBookings = async(req, res) => {
     try{
        const bookings = await Bookings.findAll({include:[Users, Buses]});
        if(bookings.length == 0 ){
            return res.status(500).json({"message":"Bookings not fount"});
        }
        res.status(200).json(bookings);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}

const postBooking = async(req, res) => {

    try{
        const {userId, busId, seatNumber, status} = req.body;
        const newBooking = await Bookings.create({userId, busId, seatNumber, status});
        res.status(200).json(newBooking);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}

const putBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { seatNumber, status, busId } = req.body;

        const [updated] = await Bookings.update(
            { seatNumber, status, busId },
            { where: { id: bookingId } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const updatedBooking = await Bookings.findByPk(bookingId, {
            include: [Users, Buses]
        });
        
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ "Error": error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const deletedCount = await Bookings.destroy({
            where: { id: bookingId }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ 
                "message": "Booking not found. Nothing was deleted." 
            });
        }
        res.status(200).json({ 
            "message": "Booking deleted successfully",
            "id": bookingId 
        });
        
    } catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

module.exports = {
    getBooking,
    getBookings,
    postBooking,
    putBooking,
    deleteBooking
}
