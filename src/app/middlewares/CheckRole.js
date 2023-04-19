const express = require('express');
const app = express();
const path = require('path');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function checkLogin(req, res, next) {
    // Check login
    try {
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'mk');
        Account.findOne({
            _id: idUser,
        })
            .then((data) => {
                if (data) {
                    req.data = data;
                    next();
                } else {
                    res.json('NOT PERMISSON');
                }
            })
            .catch((err) => {});
    } catch (err) {
        res.status(500).json('token khong hop le');
    }
};

module.exports = function checkAdmin(req, res, next) {
    var role = req.data.role;
    if (role === 'admin') {
        next();
    } else {
        res.json('ban khong co quyen truy cap');
    }
};

module.exports = function checkUser(req, res, next) {
    var role = req.data.role;
    if (role === 'admin' || role === 'user') {
        next();
    } else {
        res.json('ban khong co quyen truy cap');
    }
};
