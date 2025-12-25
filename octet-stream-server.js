import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();


// with content-type -> application/octet-stream data is send in raw binary bites , no structure , no metadata
// only one file can be sent per request
// no text filed can be send along
// no parsing needed
// faster performance
// suitable for APIs, large uploads

// backend flow : request -> fs.WriteStream

// note : content-type -> in multipart/form  metadata is build-in 
// filename="resume.pdf"
// Content-Type: application/pdf

// while  content-type -> application/octet-stream you must send metadata yourself
//  x-filename : resume.pdf
// x-Mime-Type : application/pdf


// | Scenario                  | Best choice  |
// | ------------------------- | ------------ |
// | Small files + form fields | multipart    |
// | Large videos (GBs)        | octet-stream |
// | Mobile apps               | octet-stream |
// | Direct S3 upload          | octet-stream |
// | Resumable uploads         | octet-stream |
// | Traditional forms         | multipart    |



// multipart/form-data
// Profile picture upload
// Resume + form fields
// Admin dashboards

// application/octet-stream
// YouTube uploads
// Video backups
// Large dataset uploads
// Cloud storage APIs

// Need form fields or multiple files? → multipart/form-data
// Uploading one big file via API? → application/octet-stream



app.post("/upload", (req, res) => {

    if (req.headers["content-type"] !== "application/octet-stream") {
        res.writeHead(400);
        return res.end("Invalid type");
    }

    // console.log(req.headers["x-filename"])

    const uploadPath = path.join(process.cwd(), 'upload', req.headers["x-filename"]);
    const writeStream = fs.createWriteStream(uploadPath);
    req.pipe(writeStream);


    writeStream.on("finish", () => {
        res.status(200).send("Uploaded successfully");
    });

    writeStream.on("error", (err) => {
        console.error(err);
        res.send(err);
    })


})


app.listen(3000);
