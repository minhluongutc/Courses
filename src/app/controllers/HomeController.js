const Course = require('../models/Course')
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { use } = require("../../routes/home");

class HomeController { 
  // [GET] / home
  index(req, res, next) {
    console.log(
      "🚀 ~ file: HomeController.js:7 ~ HomeController ~ index ~ req:",
      req.user
    );
    Course.find({})
      .then((courses) => {
        //courses = courses.map(course => course.toObject())
        res.render("home", {
          courses: mutipleMongooseToObject(courses),
          loggedInUser: req.user,
        });
      })
      .catch((error) => next(error));
  }
}

module.exports = new HomeController();
