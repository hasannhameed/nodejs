const express = require('express');
const http = require('http');
const app = express();
const orderRouter = require('./orderRouter');
const userRouter  = require('./userRouter');

app.use('/order',orderRouter);
app.use('/user',userRouter);

const server = http.createServer(app);
server.listen(3000);