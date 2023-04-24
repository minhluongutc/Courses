const mongoose = require('mongoose');
const Course = require('../models/Course');
const Account = require('../models/Account');

const Schema = mongoose.Schema;

const Enrollment = new Schema(
    {
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        enrolledAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 },
    },
    {
        collection: 'bought',
        timestamps: true,
    },
);

module.exports = mongoose.model('Example', Example);
