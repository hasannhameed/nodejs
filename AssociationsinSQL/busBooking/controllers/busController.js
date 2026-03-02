const {Users,Bookings,Buses} = require('../models/associations');


const getBus = async(req, res) => {
   try{
        const busId = req.params.id;
        const bus = await Buses.findByPk(busId);
        if(!bus){
            return res.status(500).json({"message":"bus not fount"});
        }
        res.status(200).json(bus);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}
const getBuses = async(req, res) => {
    try{
        const buses = await Buses.findAll();
        if(buses.length ==0 ){
            return res.status(500).json({"message":"buses not fount"});
        }
        res.status(200).json(buses);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}
const postBus = async(req, res) => {
    try{
        const {busNumber, totalSeats} = req.body;
        const  newBus = await Buses.create({busNumber, totalSeats});
        res.status(200).json(newBus);
    }catch(error){
        res.status(200).json({"Error":error.message});
    }
    res.status(200).json({"status":"working post bus"})
}
const putBus = async(req, res) => {
    try{
        const busId = req.params.id;
        const {busNumber, totalSeats} = req.body;
        await Buses.update({busNumber, totalSeats},{where:{id:busId}});
        const newBus = await Buses.findByPk(busId);
        res.status(200).json(newBus);
    }catch(error){
        res.status(500).json({"Error":error.message});
    }
    res.status(200).json({"status":"working put bus"})
}
const deleteBus = async(req, res) => {
    res.status(200).json({"status":"working delete bus"})
}

module.exports = {
    getBus,
    getBuses,
    postBus,
    putBus,
    deleteBus
}
