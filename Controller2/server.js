const express = require('express');
const app = express();
const port = 3005;

const apiRoutes = require('./routers/apiRoutes.js');

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API!');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});