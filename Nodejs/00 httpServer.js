// const http = require('node:http');

// http
//     .createServer((request, response) => {
//         let body = [];
//         request
//             .on('data', chunk => {
//                 body.push(chunk);
//             })
//             .on('end', () => {
//                 console.log(body)
//                 body = Buffer.concat(body).toString();
//                 console.log(body)
//                 response.end(body);
//             });
//     })
//     .listen(8080);


// [
//   <Buffer 7b 0d 0a 20 20 20 20 22 68 65 6c 6c 6f 22 20 3a 20 22 70 69 6c 75 70 61 6f 22 2c 0d 0a 20 20 20 20 22 70 61 6f 20 6f 20 6b 61 20 70 61 6f 22 20 3a 20 ... 48 more bytes>
// ]
// {
//     "hello" : "pilupao",
//     "pao o ka pao" : "pillupao",
//     " he he he" : "poillupaoooo"
// }


const http = require('node:http');

http
    .createServer((request, response) => {
        if (request.method === 'POST' && request.url === '/echo') {
            let body = [];
            request
                .on('data', chunk => {
                    body.push(chunk);
                })
                .on('end', () => {
                    body = Buffer.concat(body).toString();
                    response.end(body);
                });
        } else {
            response.statusCode = 404;
            response.end();
        }
    })
    .listen(8080);



// using pipe

// const http = require('node:http');

// http
//     .createServer((request, response) => {
//         if (request.method === 'POST' && request.url === '/echo') {
//             request.pipe(response);
//         } else {
//             response.statusCode = 404;
//             response.end();
//         }
//     })
//     .listen(8080);




