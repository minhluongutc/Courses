const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const Course = require('./Course')

const Schema = mongoose.Schema

const Unit = new Schema({
    unitName: { type: String, require: true, },
    exampleId: { 
        type: Array, 
        ref: 'Example',
        require: true, 
    },
    
}, {
    collection: 'units',
    timestamps: true,
})

module.exports = mongoose.model('Unit', Unit)