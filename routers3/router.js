const express        = require('express');
const app            = express();
const http           = require('http');
const coursesRouter  = require('./courseRouters');
const studentRouters = require('./studentRouters');

app.use('/cours',coursesRouter);
app.use('/students',studentRouters);
const server = http.createServer(app);
server.listen(3009);