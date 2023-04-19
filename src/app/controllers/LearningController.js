const Course = require('../models/Course');
const Unit = require('../models/Unit');
const Example = require('../models/Example');
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
                res.render('learning/show', { course });
            });
    }
}
module.exports = new LearningController();
