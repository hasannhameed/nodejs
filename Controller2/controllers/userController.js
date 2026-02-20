const getAllUsers = (req, res) =>{
    res.send('getting all the users');
}

const getUserById = (req, res)=>{
    const id = req.params.id;
    res.send(`getting user with an id ${id}`);
}

const addUser = (req, res) => {
    res.send('adding the user');
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser
}