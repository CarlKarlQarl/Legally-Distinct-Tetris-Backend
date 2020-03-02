const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const database = require("./database_connection")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

const PORT = process.env.PORT || 9000
const SECRET = "birdsArentReal"

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/", (request, response, next) => {
    response.sendStatus(200)
})

app.get("/users", (request, response, next) => {
    database("user")
        .then(users => {
            response.json(users)
        })
        .catch(error => next(error))
})

app.post("/users", (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
    .then(hashedPassword => {
        return database("user").insert({
            username: request.body.username,
            password_digest: hashedPassword
        })
            .returning(["id", "username", "password_digest"])
            .then(users => {
                response.json(users[0])
            })
            .catch(error => next(error))
    })
})

app.get("/scores", (request, response, next) => {
    database("score")
        .then(scores => {
            response.json(scores)
        })
        .catch(error => next(error))
})

app.post("/scores", (request, response, next) => {
    database("score").insert({
        points: request.body.points,
        user_id: request.body.user_id
    })
        .returning(["id", "points", "user_id"])
        .then(scores => {
            response.json(scores[0])
        })
        .catch(error => next(error))
})

app.post("/login", (request, response, next) => {
    database("user")
        .where({username: request.body.username})
        .first()
        .then(user => {
            if (!user) {
                response.status(401).json({
                    error: "No user by that name."
                })
            } else {
                return bcrypt
                    .compare(request.body.password, user.password_digest)
                    .then(isAuthenticated => {
                        if (!isAuthenticated) {
                            response.status(401).json({
                                error: "Unauthorized Access!"
                            })
                        } else {
                            return jwt.sign(user, SECRET, (error, token) => {
                                response.status(200).json({token})
                            })
                        }
                    })
            }
        })
})

app.get("/verify", (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1]
    jwt.verify(token, SECRET, (error, decodedToken) => {
        if (error){
            response.status(401).json({ message: "Unauthorized Access!"})
        } else {
            response.status(200).json({
                id: decodedToken.id,
                username: decodedToken.username
            })
        }
    })
})

app.listen(PORT)