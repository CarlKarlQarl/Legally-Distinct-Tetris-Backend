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
        .then(dogs => {
            response.json(dogs)
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

app.listen(PORT)