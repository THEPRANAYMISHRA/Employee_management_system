const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    salary: Number,
    department: String
})

let EmployeeModel = mongoose.model("employee", employeeSchema)

module.exports = EmployeeModel;