const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { use } = require('../../routes/home');
const paginate = require('express-paginate');
const mongoose = require('mongoose');



const perPage = 3;

class HomeController {
    // [GET] / home
    index(req, res, next) {
        //const perPage = 10; // Số lượng tài nguyên trên mỗi trang
        const currentPage = req.query.page || 1; // Trang hiện tại
        Course.paginate({}, { page: currentPage, limit: perPage })
          .then((result) => {
            const courses = result.docs; // Danh sách các tài nguyên được phân trang
            const pageCount = result.totalPages; // Số lượng trang tổng cộng
            res.render('home', {
              courses: mutipleMongooseToObject(courses), // Danh sách các tài nguyên được phân trang
              currentPage: currentPage, // Trang hiện tại
              pageCount: pageCount, // Số lượng trang tổng cộng
              loggedInUser: req.user, // Thông tin người dùng đăng nhập
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
