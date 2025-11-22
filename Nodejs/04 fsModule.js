const fs = require('node:fs');

// ✅ 1. Write to a file (fs.writeFile)
// This will create the file if it doesn’t exist, or overwrite it if it does.

fs.writeFile('pilupao.txt', 'Hello, world!, My Name is Pilupaoooooo', (err) => {
    if (err) {
        output
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully!');
});


// ✅ 2. Read from a file (fs.readFile)
// Reads the whole file into memory.

fs.readFile('pilupao.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File contents:', data);
});

// ✅ 3. Write using streams (for large files)

const stream = fs.createWriteStream('big.txt');
stream.write('This is a line of text.\n');
stream.write('Another line.\n');
stream.end(() => {
    console.log('Finished writing with stream');
});


// ✅ 4. Read using streams (efficient for large files)


const stream2 = fs.createReadStream('big.txt', 'utf8');

stream2.on('data', chunk => {
    console.log('Chunk received:', chunk);
});

stream2.on('end', () => {
    console.log('Finished reading file.');
});
