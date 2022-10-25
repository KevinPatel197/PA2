const express = require('express')
const app = express.Router()

//model
const student = require('../models/studentModel')

//getting all students
app.get('/', async (req, res) => {
    try {
        const data = await student.find()
        if (data) {
            return res.send(data)
        } else {
            return res.status(404).send('No Data Found')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong')
    }
})

//getting single student
app.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await student.findById(id)
        if (data) {
            return res.send(data)
        } else {
            return res.status(404).send('No Data Found')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
})

//creating student
app.post('/', async (req, res) => {
    try {
        const reqData = req.body
        const newStudent = new student({ ...reqData })
        const response = await newStudent.save()
        res.json("Student added successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
})

//updating student
app.put('/:id', async (req, res) => {
    try {
        const reqData = req.body
        const id = req.params.id
        const response = await student.findByIdAndUpdate(id, reqData)
        if (response) {
            return res.json("Student updated successfully")
        } else {
            return res.status(404).send('No Data Found For Given Id')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong')
    }
})

//deleting student
app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await student.findByIdAndDelete(id)
        if (response) {
            res.json('student deleted successfully')
        } else {
            res.status(500).json('Something went wrong')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json('Something went wrong')
    }
})

module.exports = app