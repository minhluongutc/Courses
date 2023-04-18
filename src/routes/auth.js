const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const jwtMiddleware = require('../app/middlewares/jwtMiddleware');

// Register
router.get('/register', authController.showRegister)
router.post('/register', authController.registerUser)

// Login
router.get('/login', authController.showLogin)
router.post('/login', authController.loginUser)

// Refresh
router.post('/refresh', authController.requestRefreshToken)

// Logout
router.get('/logout', authController.userLogout)
router.post('/logout', authController.userLogout)

module.exports = router;
