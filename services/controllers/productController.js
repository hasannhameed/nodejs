
const productService = require('../services/productService.js');

exports.getAllProducts = (req, res) => {
    const data = productService.getAllProducts();
    res.sendFile(data);
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    const data = productService.getProductById(id);
    res.send(data);
};

exports.addProduct = (req, res) => {
    const data = productService.addProduct(req.body);
    res.send(data);
};

// module.exports = {
//     getAllProducts,
//     getProductById,
//     addProduct
// };