const User = require('../models/users.js');

const PrintTheSuccess = async (req, res) => {
    try{
         const users = await User.findAll();
        res.status(200).json({
            data: users,
            message: 'success one to one association completed'
        });
    }catch(error){
        res.status(500).json({ 
            message: 'failed one to one association',
            error: error.message 
        });
    }
   
}

module.exports = PrintTheSuccess;