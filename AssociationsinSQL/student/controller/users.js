const {users, IDcards} = require('../models/index');

const getUser    =   async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await users.findByPk(userId, {
            include: IDcards 
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getUsers   = async (req, res) => {
    try {
        
        const userData = await users.findAll({
            include: IDcards 
        });

        if (userData.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const postUser   =  async (req, res) => {
    try {
        const { user:userData, card:cardData } = req.body;
        
        const newUser = await users.create({ 
            ...userData,
            IDcard: cardData
         },{
            include: [IDcards]
         });

        await newUser.reload();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedRows = await users.destroy({
            where: { id: userId }
        });

        if (deletedRows==0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User and their ID card deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const data = req.body;
        const affectedrows = await users.update(data,{where:{id:userId}})
        if(affectedrows == 0){
            return res.status(200).json({error:'user details not updated'});
        }
    }catch(error){
        res.status(500).json({"Error":error.message});
    }
}
module.exports = {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
}