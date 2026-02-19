const express = require('express');
const app = express();
const http = require('http');

app.use('/', (req, res, next)=>{
    req.user = 'Geust';
    console.log('this is authentication completed');
    next();
})

app.get('/', (req, res)=>{
  
    res.end(`this is authentication completed you loggedIn as ${req.user}`);
})
const server = http.createServer(app);
server.listen(3001,()=>{
    console.log('server running at http://localhost:3001');
})