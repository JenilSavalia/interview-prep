import fs from 'node:fs'

// In Node.js, streams are a way to handle reading or writing data piece by piece, instead of loading the entire data into memory at once

// 1. Readable Stream
// Used to read data.

// Examples:
// Reading a file
// Receiving an HTTP request

const read = fs.createReadStream('./pilupao.txt')

read.on('data', (chunk) => {
    console.log(chunk.toString())
})



// 2. Writable Stream
// Used to write data.

// Examples:
// Writing to a file
// Sending an HTTP response


const writable = fs.createWriteStream('./pilupao.txt');



writable.write("Hellooo")
writable.write("Puluuuu Paoo ")
writable.write("Pao oo ka Paoo")
writable.end()




// Piping streams 🔗
// pipe() connects streams together.

fs.createReadStream('./pilupao.txt').pipe(fs.createWriteStream('./copyPilupao.txt'))


// Backpressure (important concept)

// Backpressure happens when:

// A readable stream produces data faster

// Than a writable stream can consume it

// Node.js streams:

// Automatically slow down the source

// Prevent memory overload