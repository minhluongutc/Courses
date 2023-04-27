const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const EnrollmentMiddleware = require('../app/middlewares/EnrollmentMiddleware');
const learningController = require('../app/controllers/LearningController');

router.get('/showList', jwtMiddleware.verifyToken, learningController.showList)
router.post('/store', jwtMiddleware.verifyToken, learningController.store)
router.get('/create', jwtMiddleware.verifyToken, learningController.create)
router.put('/:id', jwtMiddleware.verifyToken, learningController.update);
router.get('/:id/edit', jwtMiddleware.verifyToken, learningController.edit);
router.delete('/:id', jwtMiddleware.verifyToken, learningController.delete);
router.get(
    '/:id',
    jwtMiddleware.verifyToken,
    EnrollmentMiddleware.constructor.checkEnrollmentMiddleware,
    learningController.show
);



module.exports = router;
