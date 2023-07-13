const express = require('express')
const employeeRouter = express.Router()
const EmployeeModel = require('../models/employee.model');


employeeRouter.post('/add', async (req, res) => {
    let { firstname, lastname, email, salary, department } = req.body;

    try {
        let newEmp = await EmployeeModel({ firstname, lastname, email, salary, department })
        await newEmp.save()
        return res.send({ "msg": "employee is added" })
    } catch (error) {
        console.log(error)
        return res.send({ "msg": "employee is not added" })
    }
})

employeeRouter.get('/get', async (req, res) => {
    try {
        let data = await EmployeeModel.find()
        return res.send({ "data": data })
    } catch (error) {
        return res.send({ "msg": "failed to fetch!" })
    }
})

module.exports = { employeeRouter }