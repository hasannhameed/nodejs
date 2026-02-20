const express = require('express');
const app   = express();
const http = require('http');

const booksRouter = require('./booksRouter');

app.use('/book',booksRouter)
const server = http.createServer(app);
server.listen(3001);
