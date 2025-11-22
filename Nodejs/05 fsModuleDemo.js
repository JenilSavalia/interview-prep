// server.js
const http = require('node:http');
const fs = require('node:fs');

const FILE_PATH = 'data.txt';

const server = http.createServer((req, res) => {
    // --- POST /save ---
    if (req.method === 'POST' && req.url === '/save') {
        let body = [];

        req.on('data', chunk => body.push(chunk));

        req.on('end', () => {
            body = Buffer.concat(body).toString();

            // Write to file
            fs.writeFile(FILE_PATH, body, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error writing file');
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Data saved to file!');
            });
        });

        return;
    }

    // --- GET /read ---
    if (req.method === 'GET' && req.url === '/read') {
        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error reading file');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

        return;
    }

    // --- 404 fallback ---
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
