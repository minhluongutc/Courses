const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { use } = require('../../routes/home');
const paginate = require('express-paginate');
const mongoose = require('mongoose');

const perPage = 6;

class HomeController {
    // [GET] / home
    index(req, res, next) {
        //const perPage = 10;
        const currentPage = req.query.page || 1;
        Course.paginate({}, { page: currentPage, limit: perPage })
            .then((result) => {
                const courses = result.docs;
                const pageCount = result.totalPages;
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    currentPage: currentPage,
                    pageCount: pageCount,
                    loggedInUser: req.user,
                });
            })
            .catch((error) => next(error));

        // Course.find({})
        //     .then((courses) => {
        //         res.render('home', {
        //             courses: mutipleMongooseToObject(courses),
        //             loggedInUser: req.user,
        //         });
        //     })
        //     .catch((error) => next(error));
    }
}

module.exports = new HomeController();
