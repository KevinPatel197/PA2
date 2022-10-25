const express = require('express')
const app = express()
const cors = require('cors')
const { sign, verify } = require('./auth/authenticate')
require('dotenv').config()
//database
require('./db/database')

//router
const studentRouter = require('./routes/studentRoute')

//model
const student = require('./models/studentModel')

//config
const PORT = process.env.PORT

//cors
app.use(cors())

//body-parser and json for sending json and reading body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log('default response')
    res.send('DEFAULT RESPONSE FROM SERVER')
})

//login request
app.post('/login', async (req, res) => {
    let { username, password } = req.body
    username = username
    password = password
    if (username && password) {
        let response = await student.find({ name: username, password: password });
        if (response.length === 1) {
            return res.json(sign({ username }))
        } else {
            return res.status(401).json('Invalid username or password')
        }
    } else {
        return res.status(401).json('Please provide username and password')
    }
})

app.use('/get-token', sign)

app.use('/student', [verify], studentRouter)

app.listen(PORT, () => {
    console.log(`'🚀🚀Server listening on Port : ${PORT}`);
})