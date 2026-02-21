const express = require('express');
const app = express();
const PORT = 3065;

const productRoutes = require('./routes/productRoutes');

app.use('/api', productRoutes);

// 4. Start the Server
app.listen(PORT, () => {
    console.log(`
    Server is running!
    Serving HTML from: /VIEW/products.html
    Access the form at: http://localhost:3005/api/products
    `);
});