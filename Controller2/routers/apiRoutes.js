const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.addUser);
router.get('/users/:id', userController.getUserById);

router.get('/products', productController.getAllProducts);
router.post('/products', productController.addProduct);
router.get('/products/:id', productController.getProductById);

router.get('/cart/:userId', cartController.getCartForUser);
router.post('/cart/:userId', cartController.addProductToCart);

module.exports = router;