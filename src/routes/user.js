const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const jwtMiddleware = require('../app/middlewares/jwtMiddleware');

// Get all user
// router.get('/', jwtMiddleware.verifyToken, userController.getAllUser)
router.get('/', userController.getAllUser)

// Delete user
// router.delete('/:id', jwtMiddleware.verifyTokenAndAdminAuth, userController.deleteUser)
router.delete('/:id', userController.deleteUser)

router.get('/:id/edit', userController.edit);
router.get('/search', userController.search)
router.put('/:id', userController.update);

module.exports = router;
