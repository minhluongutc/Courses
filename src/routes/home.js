const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const homeController = require('../app/controllers/HomeController');

router.get('', jwtMiddleware.verifyToken, homeController.index);

module.exports = router;
