const express = require('express');
const router = express.Router();
const { user, IDcards } = require('../models/index');


router.post('/user', async (req, res) => {
    try {
        const { user:userData, card:cardData } = req.body;
        
        const newUser = await user.create({ 
            ...userData,
            IDcard: cardData
         },{
            include: [IDcards]
         });
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user/', async (req, res) => {
    try {
        
        const userData = await user.findAll({
            include: IDcards 
        });

        if (userData.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await user.findByPk(userId, {
            include: IDcards 
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedRows = await user.destroy({
            where: { id: userId }
        });

        if (deletedRows==0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User and their ID card deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;