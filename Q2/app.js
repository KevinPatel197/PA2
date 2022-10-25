const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
const FileStore = require('session-file-store')(session)

const PORT = 9696

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: './sessionData' })
}))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        req.session.loggedIn = true;
        req.session.username = username
        console.log(req.body)
        return res.redirect('/home')
    } else {
        return res.send('Enter Username And Password!')
    }
})

app.get('/home', (req, res) => {
    if (req.session.loggedIn) {
        console.log('Login Success !! ✅✅')
        res.sendFile(__dirname + '/public/home.html')
    } else {
        console.log('Error while login !! ❌❌')
        res.sendFile(__dirname + '/public/login.html')

    }
})

app.listen(PORT, () => {
    console.log(`🚀🚀 server listening on port : ${PORT}`)
})