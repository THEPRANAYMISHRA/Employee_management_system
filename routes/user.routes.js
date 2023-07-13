const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.mode');
var jwt = require('jsonwebtoken');


userRouter.post('/signup', async (req, res) => {
    let { email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.send({ "msg": "SignUp failed :!" })
            } else {
                let newUser = await UserModel({ email, password: hash })
                await newUser.save()
                res.send({ "msg": "SignUp Successful!" })
            }
        });
    } catch (error) {
        console.log(error)
        return res.send({ "msg": "SignUp failed :!" })
    }
})

userRouter.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let isUser = await UserModel.findOne({ email: email })

    if (!isUser) {
        return res.send({ "msg": "No such user present!" })
    }

    try {
        bcrypt.compare(password, isUser.password, function (err, result) {
            if (result) {
                let token = jwt.sign({ data: 'foobar' }, 'secret', { expiresIn: '24h' });
                return res.send({ "msg": "login Successful!", "token": token })
            } else {
                return res.status(401).send({ 'msg': 'Invalid Password' });
            }
        });
    } catch (error) {
        console.log(error)
        return res.send({ "msg": "login failed :!" })
    }
})

module.exports = { userRouter }