import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(cookieParser())

const users = [];
let id = 0;


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

    const isExist = users.find((s) => s.username === username)

    if (isExist) {
        res.status(409).send("User Exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ id, username, hashed });
    id++;

    const token = jwt.sign({ id }, "sdjsnfdjvjhbdfhjsdbjhsbdbjshj");
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
    const user = users.find((s) => s.username === username)


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
            "httpOnly": true,
            "secure": true,
            "sameSite": "strict",
            maxAge: 24 * 60 * 60 * 1000
        }
    );
    res.json({
        "success": true,
        "message": "Login Success"
    })


})


app.get("/api/v1/protected", authMiddleware, (req, res) => {
    res.json({
        "success": true,
        "data": "jelloooooooo Protected Data is this pilu paoooo"
    })
})




app.listen(3000)