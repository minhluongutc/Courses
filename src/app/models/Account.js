const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema


const AccountSchema = new Schema({
    username: { type: String, minlength: 6, unique: true },
    password: { type: String, minlength: 6, require: true},
    role: { type: String, default: 'user' }
}, {
    //collection: 'Account',
    timestamps: true
})

//Add plugins
mongoose.plugin(slug)
AccountSchema.plugin(mongooseDelete, { 
    deleteAt: true,
    overrideMethods: 'all' 
}) 


module.exports = mongoose.model('Account', AccountSchema)