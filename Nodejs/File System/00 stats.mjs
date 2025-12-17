
import fs from 'node:fs';


// Every file comes with a set of details that we can inspect using Node.js. In particular, using the stat() method provided by the fs module.


// You call it passing a file path, and once Node.js gets the file details it will call the callback function you pass, with 2 parameters: an error message, and the file stats:





fs.stat('./pilupao.txt', (err, stat) => {
    if (err) {
        console.log(err)
    }
    console.log(stat)
]    stat.isFile(); // true
    stat.isDirectory(); // false
    stat.isSymbolicLink(); // false
    console.log(stat.size); // 1024000 //= 1MB

})


// Node.js also provides a sync method, which blocks the thread until the file stats are ready:

fs.statSync('./pilupao.txt', (err, stat) => {
    if (err) {
        console.log(err)
    }
    console.log(stat)
})

