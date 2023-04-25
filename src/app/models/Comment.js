const mongoose = require('mongoose');
const Account = require('../models/Account');

const comment= new mongoose.Schema({
    accountId: {
        type: String,
        ref: 'Account',
        required: true,
    },
    exampleId: {
        type: String,
        ref: 'Example',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
{
    collection: 'comments',
    timestamps: true,
},);

module.exports = mongoose.model('Comment', comment);
