const express = require('express')
const { connection } = require('./db')
const { userRouter } = require('./routes/user.routes')
const cors = require('cors')
const { employeeRouter } = require('./routes/employee.routes')
const app = express()
app.use(cors())
app.use(express.json())

app.use("/user", userRouter)

app.use("/employee", employeeRouter)

app.listen(4700, async () => {
    try {
        connection
        console.log("connected to DB!")
    } catch (error) {
        console.log(error)
    }
    console.log("Server running at 4700!")
})