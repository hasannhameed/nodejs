const productService = require('../services/productService');

exports.serveProductPage = (req, res) => {
    const filePath = productService.getProductFormPath();
    res.sendFile(filePath);
};