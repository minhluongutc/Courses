const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Example = new Schema(
    {
        exName: { type: String, require: true },
        time: { type: String },
    },
    {
        collection: 'example',
        timestamps: true,
    },
);

module.exports = mongoose.model('Example', Example);
