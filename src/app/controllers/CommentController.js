const express = require('express');
const Comment = require('../models/Comment');

class CommentController {
    async show(req, res) {
        const comments = await Comment.find();
        res.send(comments);
    }

    async post(req, res) {
        const { accountId, exampleId, content } = req.body;
        const comment = new Comment({ accountId, exampleId, content});
        await comment.save();
        res.send(comment);
    }
}

module.exports = new CommentController();