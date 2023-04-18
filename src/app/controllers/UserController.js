//const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')
const Account = require('../models/Account');

class UserController {
    // [GET] all user
    getAllUser(req, res, next) {
        let accountQuery = Account.find({})
        
        if (req.query.hasOwnProperty('_sort')) {
            accountQuery = accountQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        
        Promise.all([accountQuery, Account.countDocumentsDeleted()])
            .then(([accounts, deletedCount]) => 
                res.render('user/user', {
                    deletedCount,
                    accounts: mutipleMongooseToObject(accounts),
                })
            )
            .catch(next)
    }

    // [get] /user/:id/edit
    edit(req, res, next) {
        Account.findById(req.params.id)
            .then(account => res.render('user/edit', {
                account: mongooseToObject(account)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user'))
            .catch(next)
    }

    // Delete user
    async deleteUser (req, res) {
        try{
            //const user = await Account.findByIdAndDelete(req.params.id)
            const user = await Account.findById(req.params.id)
            return res.status(200).json("Delete successfully")
        }catch(err){
            res.status(500).json(err)
        }
    }

    search(req, res, next) {
        let regex = new RegExp(req.query.username, 'i')
        let accountQuery = Account.find({ username: { $regex: regex } })
        
        if (req.query.hasOwnProperty('_sort')) {
            accountQuery = accountQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        
        Promise.all([accountQuery, Account.countDocumentsDeleted()])
            .then(([accounts, deletedCount]) => 
                res.render('user/user', {
                    deletedCount,
                    accounts: mutipleMongooseToObject(accounts),
                })
            )
            .catch(next)
    }
}

module.exports = new UserController();