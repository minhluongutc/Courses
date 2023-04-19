const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class LearningController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('learning/show', { course: mongooseToObject(course) })
            })
            .catch(next); 
    }
}
module.exports = new LearningController();