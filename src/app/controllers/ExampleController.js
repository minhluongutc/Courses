const Course = require('../models/Course');
const Comment = require('../models/Comment');
const Example = require('../models/Example');
const Unit = require('../models/Unit');
const Learning = require('../models/Learning');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class ExampleController {
    
    show(req, res, next) {
        let exampleQuery = Example.find({})
        if (req.query.hasOwnProperty('_sort')) {
            exampleQuery = exampleQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([exampleQuery])
            .then(([example]) =>
                res.render('example/show', {
                    loggedInUser: req.user,
                    example: mutipleMongooseToObject(example),
                }),
            )
            .catch(next);
    }
    //[get] example/create
    create(req, res, next) {
        console.log(req.params.id);
        res.render('example/create', {
            loggedInUser: req.user,
            id: req.params.id,
        });
    }

    //[post] example/store
    store(req, res, next) {
        const example = new Example(req.body);
        example
            .save()
            .then(() => res.redirect(`/example/`))
            .catch((error) => {});
    }

    // [get] /example/:id/edit
    edit(req, res, next) {
        Example.findById(req.params.id)
            //console.log(enrollment)
            .then((example) =>
                res.render('example/edit', {
                    loggedInUser: req.user,
                    example: mongooseToObject(example),
                }),
            )
            .catch(next);
    }

    // [PUT] /example/:id
    update(req, res, next) {
        Example
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/example'))
            .catch(next);
    }

    async delete(req, res, next) {
        Example.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new ExampleController();
