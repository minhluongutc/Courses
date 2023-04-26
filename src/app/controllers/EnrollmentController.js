const Enrollment = require('../models/Enrollment');
const { mutipleMongooseToObject } = require('../../util/mongoose');

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

        Promise.all([enrollmentQuery, Enrollment.countDocumentsDeleted()])
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
        res.render('enrollment/create', { loggedInUser: req.user });
    }

    //[post] enrollment/store
    store(req, res, next) {
        const enrollment = new Enrollment(req.body);
        enrollment.save()
            .then(() => res.redirect(`/enrollment`))
            .catch((error) => {
                console.error(error);
                next(error);
            });
    }

    search(req, res, next) {
        let regex = new RegExp(req.query.username, 'i');
        let accountQuery = Enrollment.find({ username: { $regex: regex } })
        .populate('accountId')
        .populate('courseId')

        if (req.query.hasOwnProperty('_sort')) {
            accountQuery = accountQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([accountQuery, Enrollment.countDocumentsDeleted()])
            .then(([enrollment, deletedCount]) =>
                res.render('enrollment', {
                    loggedInUser: req.user,
                    deletedCount,
                    accounts: mutipleMongooseToObject(enrollment),
                }),
            )
            .catch(next);
    }
}
module.exports = new EnrollmentController();