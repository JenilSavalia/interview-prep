import express from 'express';
import Busboy from 'busboy';
import path from 'path';
import fs from 'fs';

const app = express();

app.post("/upload", (req, res) => {

    // flow below
    // req (readable stream) 
    // describe event handlers for busboy
    // on.("file",(fileStream)=>) 
    // create a writable stream and pipe file-stream to writablle stream (this step saves file to disk) 

    // other events like "fields" , "finish" , "error"

    // finally we pipe the our request "req" which is readable stream to busboy
    // req.pipe(busboy)

    // this above command starts the parsing of coming chnuks from request and then event listners like "file" comes in picture
    // there a parsed chunk is saved on disk through writable stream


    // multipart/form-data  ->  A container format that can carry multiple parts (files + text fields).
    // suitable for forms
    // flow :  req → busboy → fileStream → disk
    // Needs parsing


    // application/octet-stream   ->  Raw binary bytes, no structure, no metadata.
    // flow : req → fs.WriteStream
    //  No parsing
    //  No metadata
    //  Very fast
    // suitable for Large videos (GBs),Direct S3 upload,


    if (!req.headers["content-type"]?.includes("multipart/form-data")) {
        res.status(400).send("Invalid content type")
    }

    const uploadPath = './upload'

    const busboy = Busboy({
        headers: req.headers,
        limits: {
            fileSize: 10 * 1024 * 1024 // 10MB
        }
    });

    // Ensure upload directory exists
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }


    busboy.on("file", (fieldname, fileStream, fileInfo) => {

        const { filename, mimeType } = fileInfo;

        // 🔐 Validate file type
        if (!mimeType.startsWith("image/")) {
            fileStream.resume(); // drain stream
            return res.status(400).send("Only images allowed");
        }

        const uploadPath = path.join(process.cwd(), 'upload');
        const saveTo = path.join(uploadPath, `${Date.now()}-${filename}`);


        const writeStream = fs.createWriteStream(saveTo)
        fileStream.pipe(writeStream);

        writeStream.on("error", (err) => {
            console.error(err);
            res.status(500).send("Error saving file")
        })
    })

    busboy.on("finish", () => {
        res.status(200).send("Upload successful")
    })

    busboy.on("error", (err) => {
        console.error(err);
        res.status(500).send("Upload failed")
    })

    req.pipe(busboy);

})






app.listen(3000);