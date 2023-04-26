const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const jwtMiddleware = require('../app/middlewares/jwtMiddleware');

// Get all user
// router.get('/', jwtMiddleware.verifyToken, userController.getAllUser)
router.get('/', jwtMiddleware.verifyToken, userController.getAllUser);

// Delete user
// router.delete('/:id', jwtMiddleware.verifyTokenAndAdminAuth, userController.deleteUser)
router.delete('/:id', jwtMiddleware.verifyToken, userController.delete);

router.get('/:id/edit', jwtMiddleware.verifyToken, userController.edit);
router.get('/search', jwtMiddleware.verifyToken, userController.search);
router.put('/:id', jwtMiddleware.verifyToken, userController.update);

module.exports = router;
