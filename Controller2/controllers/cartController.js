const getCartForUser = (req, res) => {
    const user = req.params.user;
    res.send(`Fetches the cart for a ${user}`);
}

const addProductToCart = (req, res) => {
    const user = req.params.user;
    res.send(`Adds a product to the ${user}`);
}

module.exports =  {
    getCartForUser,
    addProductToCart
}