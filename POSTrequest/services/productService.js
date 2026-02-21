
const path = require('path');

const getProductFormPath = () => {

    return path.join(__dirname, '..', 'VIEW', 'products.html');
};

module.exports = {
    getProductFormPath
};