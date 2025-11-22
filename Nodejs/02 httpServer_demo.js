// server.js
const http = require('http');

// http request is readable stream and response is writable stream 
// even websockets underhood uses streams

function logger(req) {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
}



const server = http.createServer((req, res) => {

    logger(req)

    // --- GET / ---
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Home page\n');
    }

    // --- GET /about ---
    if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('This is the about page.\n');
    }

    // --- POST /echo (handles streaming body) ---
    if (req.method === 'POST' && req.url === '/echo') {
        let body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(body); // Echo back the body
        });

        return;
    }

    // --- 404 fallback ---
    res.statusCode = 404;
    res.end('Not found\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
