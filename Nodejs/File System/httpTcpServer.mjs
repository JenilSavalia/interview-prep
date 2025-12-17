import net from 'node:net';

const server = net.createServer((socket) => {
    socket.on('data', (chunk) => {
        // Ignore request, just send response
        const response =
            `HTTP/1.1 200 OK\r\n` +
            `Content-Length: 12\r\n` +
            `Content-Type: text/plain\r\n` +
            `Connection: close\r\n` +
            `\r\n` +
            `Hello World!`;

        socket.write(response);
        socket.end();
    });
});

server.listen(3000);
console.log('Server running on port 3000');
