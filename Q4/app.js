const express = require('express')
const app = express()
const PORT = 9090
const database = require('./db/database')
const student = require('./routes/student')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const accessTokenSecret = process.env.TOKEN_SECRET;
const studentModel = require('./models/student')
const verifyToken = require('./middleware/token')

app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.use('/student', student)

app.get('/', (req, res) => {
    const token = req.cookies.token
    if (token) {
        //verify token
        if (jwt.verify(token, process.env.TOKEN_SECRET)) {
            return res.redirect('/student')
        } else {
            return res.status(401).end('Unauthorized access');
        }
    }
    else {
        //redirect to login
        return res.render('login')
    }
})

app.post('/login', async (req, res) => {
    let { username, password } = req.body
    if (username && password) {
        try {
            let result = await studentModel.find({ name: username, password: password })
            if (result.length === 1) {
                //Generate Token
                const accessToken = jwt.sign({ name: username, password: password }, accessTokenSecret)
                res.cookie('token', accessToken, { httpOnly: true });
                return res.redirect('/student')
                // return res.render('index', { session: result[0], accessToken: accessToken })
            } else {
                res.render('login', { errors: { validationError: 'Enter Valid Username Or Password' } })
            }
        } catch (error) {
            res.render('login', { errors: { validationError: 'There Was Problem While Log In.' } })
        }
    } else {
        res.render('login', { errors: { AllFieldsError: 'Please Enter Username And Password' } })
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.render('login')
})

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})