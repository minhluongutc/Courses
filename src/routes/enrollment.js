const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const enrollmentController = require('../app/controllers/EnrollmentController');

router.get('/search', jwtMiddleware.verifyToken, enrollmentController.search);
router.get('/', jwtMiddleware.verifyToken, enrollmentController.show);
module.exports = router;
