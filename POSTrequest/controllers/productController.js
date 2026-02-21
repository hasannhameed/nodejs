const productService = require('../services/productService');
exports.serveProductPage = (req, res) => {
    const filePath = productService.getProductFormPath();
    res.sendFile(filePath);
};
exports.addProduct = (req, res) => {
    const { productName } = req.body;

    console.log("Data received on server:", req.body);

    res.json({
        message: "Product added successfully!",
        receivedData: productName
    });
};