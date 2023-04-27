const express = require('express');
const router = express.Router();
const CommentController = require('../app/controllers/CommentController');
// Lấy danh sách bình luận
router.get('/', CommentController.show);

// Thêm bình luận mới
router.post('/', CommentController.post);

module.exports = router;
