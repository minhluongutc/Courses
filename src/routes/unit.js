const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const EnrollmentMiddleware = require('../app/middlewares/EnrollmentMiddleware');
const unitController = require('../app/controllers/UnitController');

router.get('/', jwtMiddleware.verifyToken, unitController.show)
router.post('/store', jwtMiddleware.verifyToken, unitController.store)
router.get('/create', jwtMiddleware.verifyToken, unitController.create)
router.put('/:id', jwtMiddleware.verifyToken, unitController.update);
router.get('/:id/edit', jwtMiddleware.verifyToken, unitController.edit);
router.delete('/:id', jwtMiddleware.verifyToken, unitController.delete);

module.exports = router;
