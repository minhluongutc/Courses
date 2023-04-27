const Course = require('../models/Course');
const Comment = require('../models/Comment');
const Example = require('../models/Example');
const Unit = require('../models/Unit');
const Learning = require('../models/Learning');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class UnitController {
    
    show(req, res, next) {
        let unitQuery = Unit.find({})
        if (req.query.hasOwnProperty('_sort')) {
            unitQuery = unitQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([unitQuery])
            .then(([unit]) =>
                res.render('unit/show', {
                    loggedInUser: req.user,
                    unit: mutipleMongooseToObject(unit),
                }),
            )
            .catch(next);
    }
    //[get] unit/create
    create(req, res, next) {
        console.log(req.params.id);
        res.render('unit/create', {
            loggedInUser: req.user,
            id: req.params.id,
        });
    }

    //[post] example/store
    store(req, res, next) {
        const unit = new Unit(req.body);
        unit
            .save()
            .then(() => res.redirect(`/unit/`))
            .catch((error) => {});
    }

    // [get] /unit/:id/edit
    edit(req, res, next) {
        Unit.findById(req.params.id)
            //console.log(enrollment)
            .then((unit) =>
                res.render('unit/edit', {
                    loggedInUser: req.user,
                    unit: mongooseToObject(unit),
                }),
            )
            .catch(next);
    }

    // [PUT] /example/:id
    update(req, res, next) {
        Unit
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/unit'))
            .catch(next);
    }

    async delete(req, res, next) {
        Unit.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new UnitController();
