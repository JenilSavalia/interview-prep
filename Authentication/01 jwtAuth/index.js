import express, { text } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import { MongoClient } from 'mongodb';
import connectMongoDB from './connectMongoDB.js';
import { User } from './Models/User.js'

const app = express();

app.use(express.json());
app.use(cookieParser())



// let users;
// const connectDB = async () => {
//     try {
//         const client = new MongoClient("mongodb://localhost:27017/");
//         await client.connect();
//         console.log("Connected To db")
//         const database = client.db("auth");
//         users = database.collection("users")
//     } catch (e) {
//         console.error("Mongodb Conection Error", e.message)
//     }

// }
// connectDB()


connectMongoDB();



function authMiddleware(req, res, next) {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Unauthorised");
        }

        const deocded = jwt.verify(token, "sdjsnfdjvjhbdfhjsdbjhsbdbjshj");

        req.user = deocded;

        next();
    } catch (ert) {
        return res.status(401).json({ "message": "Invalid Token" })
    }

}

app.post("/api/v1/signup", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Provide Credentials");
    }

    const isExist = await User.findOne({ "username": username })

    if (isExist) {
        return res.status(409).send("User Exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    User.create({ username, hashed });

    const userId = await User.findOne({ "username": username })

    const token = jwt.sign({ id: userId }, "sdjsnfdjvjhbdfhjsdbjhsbdbjshj");
    res.cookie("token", token, {
        "httpOnly": true,
        "secure": true,
        "sameSite": "strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
        "Success": true,
    })

})

app.post("/api/v1/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Provide Credentials")
    }

    // check if user exists
    const user = await User.findOne({ "username": username })

    console.log(user)
    if (!user) {
        return res.status(404).json({
            "success": false,
            "message": "User Not registerted"
        })
    }

    // check password and  generate jwt
    const isValid = await bcrypt.compare(password, user.hashed,)


    if (!isValid) {
        return res.status(401).send("Invalid Creds")
    }

    const token = jwt.sign({ id: user.id }, "sdjsnfdjvjhbdfhjsdbjhsbdbjshj", {

        expiresIn: "1d"
    })
    res.cookie("token", token,
        {
            "httpOnly": true,   //  disables javascript document to access cookie
            "secure": true,     // sends cookie over https
            "sameSite": "strict",   // restrict cookies access and disallow
            //  sending them along with requests initiated from third-party websites
            maxAge: 24 * 60 * 60 * 1000
        }
    );
    res.json({
        "success": true,
        "message": "Login Success"
    })


})

app.post("/api/v1/logout", authMiddleware, (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    res.json({
        "success": true,
        "message": "Logout Successful"
    });
})

app.get("/api/v1/protected", authMiddleware, (req, res) => {
    res.json({
        "success": true,
        "data": "jelloooooooo Protected Data is this pilu paoooo"
    })
})






app.listen(3000, console.log("server  Started"));