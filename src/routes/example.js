const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const EnrollmentMiddleware = require('../app/middlewares/EnrollmentMiddleware');
const exampleController = require('../app/controllers/ExampleController');

router.get('/', jwtMiddleware.verifyToken, exampleController.show)
router.post('/store', jwtMiddleware.verifyToken, exampleController.store)
router.get('/create', jwtMiddleware.verifyToken, exampleController.create)
router.put('/:id', jwtMiddleware.verifyToken, exampleController.update);
router.get('/search', jwtMiddleware.verifyToken, exampleController.search);
router.get('/:id/edit', jwtMiddleware.verifyToken, exampleController.edit);
router.delete('/:id', jwtMiddleware.verifyToken, exampleController.delete);

module.exports = router;
