const http = require('http');

const server = http.createServer((req, res) => {
    rer.setHeader('Content-Type','text/html');

    let url = req.url;
     
    if(url === '/home'){
        res.statusCode = 200;
        res.end('<h1>Welcome home2</h1>');
    }else if(url === '/about'){
        res.statusCode = 200;
        res.end('<h1>Welcome to about2</h1>')
    }else if(url === '/contact'){
        res.statusCode = 200;
        res.end('<h1>Welcome to contact2</h1>')
    }else{
        res.statusCode = 400;
        res.end('<h1>no fount 4042</h1>')
    }
})

server.listen(3001,()=>{
    console.log('running');
})