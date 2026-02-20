const express = require('express');
const app = express();

const userRoutes = require('./routers/userRouter.js');
const productRoutes = require('./routers/producRoute.js');
const cartRoutes = require('./routers/cartRouter.js');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => res.send("E-Commerce API is running!"));

app.use((req, res) => res.status(404).send("Page not found"));

const PORT = 3007;
app.listen(PORT, () => {
    console.log(`E-Commerce Server running on http://localhost:${PORT}`);
});