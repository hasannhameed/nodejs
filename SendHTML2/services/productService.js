const path = require('path');

const getProductFormPath = () =>  {
    return path.join(__dirname,'..','view','products.html');
}

module.exports = {
    getProductFormPath
}