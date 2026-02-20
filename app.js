const http = require('http');
const RWfile = require('./routes.js');

const server = http.createServer(RWfile.serverFunction);
const PORT = 3015;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/home`);
});