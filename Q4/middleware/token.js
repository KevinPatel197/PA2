const jwt = require('jsonwebtoken')

const signToken = async (req, res) => {
    //TODO: implement sign token logic here
}

const verifyToken = async (req, res, next) => {
    const token = req?.cookies?.token
    if (token) {
        //verify token
        if (jwt.verify(token, process.env.TOKEN_SECRET)) {
            // return res.send('token found and verified');
            next()
        } else {
            return res.status(401).end('Unauthorized access');
        }
    }
    else {
        //redirect to login
        return res.status(401).send('Token Missing')
    }
}

module.exports = { signToken, verifyToken }