import fs from 'node:fs';

// Before you're able to interact with a file that sits in your filesystem, you must get a file descriptor.


// Opens a file and gives you a file descriptor.
fs.open('./02 readFile..mjs', 'r', (err, fd) => {
    console.log(fd)
})

// A file descriptor is a reference to an open file, a number (fd) returned by opening the
//  file using the open() method offered by the fs module.
//   This number (fd) uniquely identifies an open file in operating system:

