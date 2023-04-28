const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const Token = new Schema(
    {
        facebookId: String,
        name: String,
        email: String,
        token: String,
        role: { type: String, default: 'user' },
    },
    {
        collection: 'tokens',
        timestamps: true,
    },
);


module.exports = mongoose.model('Token', Token);
