const express = require('express');
const Comment = require('../models/Comment');
const Account = require('../models/Account');

class CommentController {
    // async show(req, res) {
    //     const comments = await Comment.find();
    //     res.send(comments);
    // }

    async show(req, res) {
        const exampleId = req.query.exampleId;
        const comments = await Comment.find({ exampleId });
        console.log(exampleId);
        res.send(comments);
    }

    async post(req, res) {
        const { accountId, exampleId, content } = req.body;
        console.log(exampleId)
        const comment = new Comment({ accountId, exampleId, content });
        await comment.save();
        res.send(comment);
    }
}

module.exports = new CommentController();
