const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Example = new Schema(
    {
        exName: { type: String, require: true },
        time: { type: String },
        videoId: { type: String }
    },
    {
        collection: 'example',
        timestamps: false,
    },
);


module.exports = mongoose.model('Example', Example);
