const path = require('path');
//i need to send this html file ../services/productService.js in get file
const getAllProducts = () => {
    return path.join(__dirname,'..','VIEW','products.html');
};

const getProductById = (id) => {
    return `Fetching product with ID: ${id}`;
};

const addProduct = (productData) => {
    return "Adding a new product";
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};