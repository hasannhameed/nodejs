let http = require('http');
let fs   = require('fs');

let server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let url = req.url;

    if (url === '/home') {
        fs.readFile('bufferValue.txt','utf8',(error,data)=>{
            let savedName = error ? "No data found" : data;
            res.statusCode = 200;
            res.end(`
                <h3>Last Saved Entry: ${savedName}</h3>
                <form action='/success' method='POST'>
                <label>Name</label> 
                <input name='userName' placeholder='enter a name'>
                <button type='submit'>Add</button>
                </form>`);
        })

    } else if (url === '/success' && req.method === 'POST') { 
        let dataChunks = [];
        req.on('data', (chunk) => {
            dataChunks.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(dataChunks).toString();
            console.log("Full Body Received:", parsedBody);
            fs.appendFile('bufferValue.txt',parsedBody,(error)=>{

                if(error){
                    console.log("Error writing to file:", err);
                    res.statusCode = 500;
                    return res.end("<h1>Server Error</h1>");
                }

                res.statusCode = 302;
                res.setHeader('Location', '/home');
                return res.end();

            })
          
        });

    } else {
        res.statusCode = 404;
        res.end('<h1>Page Not Found</h1>');
    }
});

server.listen(3014, () => {
    console.log('Server is running at http://localhost:3013/home');
});