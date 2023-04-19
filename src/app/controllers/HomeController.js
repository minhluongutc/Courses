const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { use } = require('../../routes/home');

class HomeController {
    // [GET] / home
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    loggedInUser: req.user,
                });
            })
            .catch((error) => next(error));
    }
}

module.exports = new HomeController();
