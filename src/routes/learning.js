const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const EnrollmentMiddleware = require('../app/middlewares/EnrollmentMiddleware');
const learningController = require('../app/controllers/LearningController');

//router.get('/:id', jwtMiddleware.verifyTokenAndAdminAuth, learningController.show);
router.get('/:id', EnrollmentMiddleware.constructor.checkEnrollmentMiddleware, learningController.show);

module.exports = router;
