import fs from 'node:fs'

// Text file  → Buffer → String (UTF-8)
fs.readFile('./pilupao.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data)
})




// Alternatively, you can use the synchronous version fs.readFileSync():


// All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile()
// read the full content of the file in memory before returning the data.

// This means that big files are going to have a major impact on your memory consumption and speed of execution of the program.










const content = 'hellooooooooooooooooooooooooooooooooooooooooooooooooooooooo'

fs.writeFile('./pilupao.txt', content, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('file written successfully')
        // file written successfully
    }

})
// By default, this API will replace the contents of the file if it does already exist.


// Alternatively, you can use the synchronous version fs.writeFileSync():

const content2 = 'Some content!';
fs.appendFile('./pilupao.txt', content2, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('done!!')
        // done!
    }
});







