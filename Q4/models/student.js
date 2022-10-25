const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    city: String
})

module.exports = new mongoose.model('student', studentSchema, 'students')