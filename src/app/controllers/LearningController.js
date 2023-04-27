const Course = require('../models/Course');
const Comment = require('../models/Comment');
const Example = require('../models/Example');
const Unit = require('../models/Unit');
const Learning = require('../models/Learning');
const { mongooseToObject, mutipleMongooseToObject  } = require('../../util/mongoose');

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
                res.render('learning/show', {
                    course,
                    loggedInUser: req.user,
                });
            });
    }

    showList(req, res, next) {
        let learningQuery = Learning.find({})
        if (req.query.hasOwnProperty('_sort')) {
            learningQuery = learningQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([learningQuery])
            .then(([learning]) =>
                res.render('learning/showList', {
                    loggedInUser: req.user,
                    learning: mutipleMongooseToObject(learning),
                }),
            )
            .catch(next);
    }
    //[get] learning/create
    create(req, res, next) {
        console.log(req.params.id);
        res.render('learning/create', {
            loggedInUser: req.user,
            id: req.params.id,
        });
    }

    //[post] learning/store
    store(req, res, next) {
        const learning = new Learning(req.body);
        learning
            .save()
            .then(() => res.redirect(`/learning/showList/`))
            .catch((error) => {});
    }

    // [get] /learning/:id/edit
    edit(req, res, next) {
        Learning.findById(req.params.id)
            //console.log(enrollment)
            .then((learning) =>
                res.render('learning/edit', {
                    loggedInUser: req.user,
                    learning: mongooseToObject(learning),
                }),
            )
            .catch(next);
    }

    // [PUT] /example/:id
    update(req, res, next) {
        Learning
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/learning/showList'))
            .catch(next);
    }

    async delete(req, res, next) {
        Learning.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    search(req, res, next) {
        let regex = new RegExp(req.query.username, 'i');
        let learningQuery = Learning.find({ username: { $regex: regex } });

        if (req.query.hasOwnProperty('_sort')) {
            learningQuery = learningQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([learningQuery])
            .then(([learning, deletedCount]) =>
                res.render('learning/showList', {
                    loggedInUser: req.user,
                    deletedCount,
                    learning: mutipleMongooseToObject(learning),
                }),
            )
            .catch(next);
    }
}
module.exports = new LearningController();
