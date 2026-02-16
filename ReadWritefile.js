const fs = require('fs');

let serverFunction = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let url = req.url;

    if (url === '/home') {
        fs.readFile('bufferValue.txt', 'utf8', (error, data) => {
            let savedName = error ? "No data found" : data;
            res.statusCode = 200;
            res.end(`
                <h3>Full History:</h3>
                <pre>${savedName}</pre> <form action='/success' method='POST'>
                    <label>Name</label> 
                    <input name='userName' placeholder='enter a name'>
                    <button type='submit'>Add</button>
                </form>`);
        });

    } else if (url === '/success' && req.method === 'POST') {
        let dataChunks = [];
        req.on('data', (chunk) => {
            dataChunks.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(dataChunks).toString();
            const userName = parsedBody.split('=')[1]; 

            fs.appendFile('bufferValue.txt', userName + '\n', (error) => {
                if (error) {
                    console.log("Error writing to file:", error);
                    res.statusCode = 500;
                    return res.end("<h1>Server Error</h1>");
                }

                res.statusCode = 302;
                res.setHeader('Location', '/home');
                return res.end();
            });
        });

    } else {
        res.statusCode = 404;
        res.end('<h1>Page Not Found</h1>');
    }
};

module.exports = { serverFunction };