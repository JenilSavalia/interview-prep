import express from "express"
import multer from "multer"
import fs from 'fs'
import path from 'path'

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used 
// for uploading files. It is written on top of busboy for maximum efficiency.

// NOTE: Multer will not process any form which is not multipart (multipart/form-data).

// multer parses the multipart/form-data (which includes both files and text field)
// and adds body and files object to request object.

// The body object contains the values of the text fields of the form



const app = express();

const uploadDir = "./upload";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});


const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images allowed"));
        }
        cb(null, true);
    }
});


app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file); // file info
    console.log(req.body); // text fields

    res.json({
        message: "Upload successful",
        filename: req.file.filename
    });

})




app.listen(3000);