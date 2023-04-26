const Course = require('../models/Course');
const Comment = require('../models/Comment');
const Example = require('../models/Example');
const Unit = require('../models/Unit');
const Learning = require('../models/Learning');
const { mongooseToObject } = require('../../util/mongoose');

class LearningController {
    
    show(req, res, next) {
        Course.findById(req.params.id)
            .populate({
                path: 'learningId',
                populate: {
                    path: 'unitId',
                    populate: {
                        path: 'exampleId',
                    },
                },
            })
            .exec((err, course) => {
              if (err) {
                return next(err);
              }
              // console.log(course.learningId.unitId[0].exampleId[0].time)
              // res.status(200).json(course)
              res.render("learning/show", {
                course,
                loggedInUser: req.user
              });
            });
    }
}
module.exports = new LearningController();
