const express = require('express');
const { verifyToken } = require('../middleware/token');
const student = express.Router();
const studentModel = require('../models/student')

student.use(verifyToken)

//create
student.get('/add', (req, res) => {
    res.render('add');
})
student.post('/', async (req, res) => {
    try {
        const newStudent = req.body;
        const student = new studentModel({
            ...newStudent
        })
        await student.save()
        res.redirect('/')
    } catch (error) {
        res.send('There was problem creating students')
    }
})

//read
student.get('/:id', async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        student ? res.render('view', { data: student }) : res.render('index', { noDataError: 'No students found' })
    } catch (error) {
        res.send('There was problem getting student')
    }
})

student.get('/', async (req, res) => {
    try {
        const students = await studentModel.find()
        students ? res.render('index', { data: students }) : res.render('index', { noDataError: 'No students found' })
    } catch (error) {
        res.send('There was problem getting students')
    }
})

//update
student.get('/edit/:id', async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        student ? res.render('update', { data: student }) : res.render('index', { noDataError: 'student not found' })
    } catch (error) {
        res.send('There was problem getting student')
    }
})

student.post('/edit/:id', async (req, res) => {
    console.log('student post /:id')
    try {
        const updatedStudent = req.body;
        const id = req.params.id;
        console.log('updated student: ', updatedStudent)
        delete updatedStudent['_id']
        await studentModel.findOneAndUpdate({ _id: id }, updatedStudent)
        return res.redirect('/')
    } catch (error) {
        return res.send('There was problem updating students')
    }
})

//delete
student.get('/delete/:id', async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        student ? res.render('delete', { data: student }) : res.render('index', { noDataError: 'student not found' })
    } catch (error) {
        res.send('There was problem getting student')
    }
})
student.post('/delete', async (req, res) => {
    console.log('delete student request')
    try {
        const id = req.body._id
        console.log("id: ", id)
        await studentModel.findOneAndDelete({ _id: id })
        res.redirect('/')
    } catch (error) {
        console.log('Error: ', error)
        res.send('There was problem deleting students')
    }
})

module.exports = student