const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const enrollmentController = require('../app/controllers/EnrollmentController');

router.get('/search', jwtMiddleware.verifyToken, enrollmentController.search);
router.get(
    '/:id/create',
    jwtMiddleware.verifyToken,
    enrollmentController.create,
);
router.get('/:id/edit', jwtMiddleware.verifyToken, enrollmentController.edit);
router.post('/store', jwtMiddleware.verifyToken, enrollmentController.store);
router.put('/:id', jwtMiddleware.verifyToken, enrollmentController.update);
router.delete('/:id', jwtMiddleware.verifyToken, enrollmentController.delete);
router.get('/', jwtMiddleware.verifyToken, enrollmentController.show);
module.exports = router;
