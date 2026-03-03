const {Users,Bookings,Buses} = require('../models/associations');


const getUser = async(req, res) => {
    try{
        const userId = req.params.id;
        const user = await Users.findByPk(userId);
        if(!user){
            return res.status(500).json({"message":"user not fount"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}
const getUsers = async(req, res) => {
     try{
        const users = await Users.findAll();
        if(users.length==0){
            return res.status(500).json({"message":"users not fount"});
        }
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
}
const postUser = async(req, res) => {
     try{
        const {name, email } = req.body;
        const newUser = await Users.create({name, email});
        res.status(200).json(newUser);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
   
}
const putUser = async(req, res) => {
     try{
        const userId = req.params.id;
        const {name, email} = req.body;
        await Users.update({name, email},{where:{id:userId}});
        const updateUser = await Users.findByPk(userId);
        res.status(200).json(updateUser);
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
    
}
const deleteUser = async(req, res) => {
     try{
        const userId = req.params.id;
        const affectedRows = await Users.destroy({where:{id:userId}});
        if(affectedRows != 0){
            res.status(200).json({'Message':"User deleted"});
        }
        res.status(500).json({'Message':"User not deleted"});
    }catch(error){
        res.status(500).json({"Error":error.message})
    }
    
}

module.exports = {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
}
