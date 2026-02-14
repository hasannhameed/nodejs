const http = require('http');
const fs = require('fs').promises;
const filePath = './users.txt';

const setFileData = async(data) => {
    let file = await fs.writeFile(filePath,JSON.stringify(data,null,2));
    return file || [];
}

const getFileData = async() => {
    let file = await fs.readFile(filePath,'uTF8');
    return JSON.parse(file) || [];
}

const server = http.createServer( async (req, res)=>{

    res.setHeader('Content-Type','Application/json');

    let fileData = await getFileData();
    let body     = '';
    let url      = req.url;
    let method   = req.method;

    req.on('data',chunks=>{ body += chunks.toString() })

    req.on('end', async ()=> {

         // 1. GET ALL - Use exact match '===' to avoid overlapping with ID routes
        if (url === '/api/users' && method === 'GET') {
            return res.end(JSON.stringify(fileData));
        }

        // 2. GET SINGLE - Use .startsWith()
        if (url.startsWith('/api/users/') && method === 'GET') {
            let id = url.split('/')[3];
            let user = fileData.find(u => u.id == id); // Use '==' to match String to Number
            res.statusCode = user ? 200 : 404;
            return res.end(JSON.stringify(user || { message: "Not found" }));
        }
        if (url.startsWith('/api/users/') && method == 'POST'){

            let id   = fileData.length > 0 ? fileData[fileData.length - 1].id + 1 : 1;
            let user = JSON.parse(body);
            let obj  = {
                id,
                ...user
            }
            fileData.push(obj);
            await setFileData(fileData);
            res.statusCode = 200;
            res.end(JSON.stringify(obj));
        }
        if (url.startsWith('/api/users/') && method == 'PUT'){
            let id = url.split('/')[3];
            let user = fileData.find(user == user.id === id);
            res.statusCode = 200;
            res.end(JSON.stringify(user));
            
        }
       if (url.startsWith('/api/users/') && method === 'DELETE') {

            let id = url.split('/')[3];
            let users = fileData.filter(user=>user.id != id);
            await setFileData(users);
            res.statusCode = 200;
            res.end(users);
            
        }
    })
})

server.listen(3032,()=>{
    console.log('this is running');
});