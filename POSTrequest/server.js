const express = require('express');
const app = express();
const PORT = 3017;
const productRoutes = require('./routes/productRoutes');

// MIDDLEWARE: Essential for Axios/JSON data
app.use(express.json()); 

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/api/products`);
});