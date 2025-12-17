const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


// parses the cookie 
app.use(cookieParser())



app.get('/', (req, res) => {
    const token = jwt.sign({ "id": "pilupao848" }, "sdnsdhfbhdbfjsdbfdbsfhsdbhfbbdsfb");
    res.cookie("token", token)
    res.send("token assigned!!!!");
})

app.get('/get', (req, res) => {
    const token = jwt.verify(req.cookies.token, "sdnsdhfbhdbfjsdbfdbsfhsdbhfbbdsfb");
    console.log(token)
    res.send(token);
})





app.listen(3000);