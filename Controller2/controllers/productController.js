const getAllProducts = (req, res) => {
    res.send('Gettign all the products');
}
const getProductById = (req, res) =>{
    const id = parseInt(req.params.id);
    res.send(`getting product with an id ${id}`);
}
const addProduct = (req, res) => {
    res.send(`Adding the product`);
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById
}