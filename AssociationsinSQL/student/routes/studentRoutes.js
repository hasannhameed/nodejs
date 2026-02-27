const express = require('express');
const router = express.Router();
const users = require('../models/users');
const Post = require('../models/Post');


router.post('/add-post', async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        
        
        const newPost = await Post.create({ title, content, userId });
        
        res.status(201).json({ 
            message: 'Post created and associated successfully', 
            newPost 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/user-posts/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        
        const userData = await users.findByPk(userId, {
            include: Post 
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;