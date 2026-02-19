const express = require('express');
const app = express();
const http = require('http');


app.use('/', (req, res, next) => {
    console.log('Step 1: Doing some logic here...');
    next(); 
});


app.use('/', (req, res, next) => {
    console.log('Step 2: Sending the final response.');
    res.send('This is the final response sent via the middleware chain!');
});

const server = http.createServer(app);
server.listen(3001, () => {
    console.log('Server started: http://localhost:3001');
});