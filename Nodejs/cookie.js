const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();


// parses the cookie 
app.use(cookieParser())


app.get('/', (req, res) => {
    res.cookie("token", "dhjfbshbfj")
    res.send("hello ");
})

app.get('/getCookie', (req, res) => {
    console.log(req.cookies.token);
    res.send("got cookeeeeee");
})



app.listen(3000);