const express = require('express')
const app = express()
const path = require('path')
const Account = require('../models/Account')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

module.exports = function checkAdmin (req, res, next) {
    var role = req.data.role
    if( role === 'admin' ) {
        next()
    } else {
        res.json('ban khong co quyen truy cap')
    }
}
