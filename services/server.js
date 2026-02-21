const express = require('express');
const app = express();
const PORT = 3006;

const productRoutes = require('./routes/productRoutes.js');

app.use(express.json());

app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to your E-Commerce API!');
});

app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`);
    console.log(`Test it at: http://localhost:${PORT}/api/products`);
});