const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const paginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String },
        videoId: { type: String, require: true },
        level: { type: String },
        deletedAt: { type: String },
        price: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        learningId: {
            type: String,
            ref: 'Learning',
        },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});
Course.plugin(paginate);

module.exports = mongoose.model('Course', Course);
