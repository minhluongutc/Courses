const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const Course = require('../models/Course')

const Schema = mongoose.Schema

const Learning = new Schema({
    nameCourse: { type: String, require: true, },
    unitId: { 
        type: Array, 
        ref: 'Unit',
    }
    
}, {
    collection: 'learning',
    timestamps: true,
})

module.exports = mongoose.model('Learning', Learning)