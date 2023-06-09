const mongoose = require('mongoose');
const Course = require('../models/Course');
const Account = require('../models/Account');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Enrollment = new Schema(
    {
        accountId: {
            type: String,
            ref: 'Account',
            required: true,
        },
        courseId: {
            type: String,
            ref: 'Course',
            required: true,
        },
        progress: { type: Number, default: 0 },
    },
    {
        collection: 'enrollment',
        timestamps: true,
    },
);


module.exports = mongoose.model('Enrollment', Enrollment);
