const Enrollment = require('../models/Enrollment');
const Account = require('../models/Account');
const Course = require('../models/Course');
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose');

class EnrollmentController {
    show(req, res, next) {
        let enrollmentQuery = Enrollment.find({})
            .populate('accountId')
            .populate('courseId')
        //console.log(Enrollment.accountId)
        if (req.query.hasOwnProperty('_sort')) {
            enrollmentQuery = enrollmentQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([enrollmentQuery])
            .then(([enrollment]) =>
                res.render('enrollment/enrollment', {
                    loggedInUser: req.user,
                    courses: mutipleMongooseToObject(enrollment),
                }),
            )
            .catch(next);
    }

    //[get] enrollment/create
    create(req, res, next) {
        console.log(req.params.id);
        res.render('enrollment/create', {
            loggedInUser: req.user,
            id: req.params.id,
        });
    }

    //[post] enrollment/store
    store(req, res, next) {
        const enrollment = new Enrollment(req.body);
        enrollment
            .save()
            .then(() => res.redirect(`/enrollment`))
            .catch((error) => {});
    }

    // [get] /enrollment/:id/edit
    edit(req, res, next) {
        Enrollment.findById(req.params.id)
            //console.log(enrollment)
            .then((enrollment) =>
                res.render('enrollment/edit', {
                    loggedInUser: req.user,
                    enrollment: mongooseToObject(enrollment),
                }),
            )
            .catch(next);
    }

    // [PUT] /enrollment/:id
    update(req, res, next) {
        Enrollment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/enrollment'))
            .catch(next);
    }

    async delete(req, res, next) {
        Enrollment.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    search(req, res, next) {
        let regex = new RegExp(req.query.username, 'i');
        let accountQuery = Enrollment.find({ username: { $regex: regex } })
            .populate('accountId')
            .populate('courseId');

        if (req.query.hasOwnProperty('_sort')) {
            accountQuery = accountQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([accountQuery, Enrollment.countDocumentsDeleted()])
            .then(([enrollment, deletedCount]) =>
                res.render('enrollment', {
                    loggedInUser: req.user,
                    accounts: mutipleMongooseToObject(enrollment),
                }),
            )
            .catch(next);
    }
}
module.exports = new EnrollmentController();
