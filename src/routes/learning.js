const express = require('express');
const router = express.Router();

const jwtMiddleware = require("../app/middlewares/jwtMiddleware");
const learningController = require('../app/controllers/LearningController');

router.get('/:id', learningController.show);

module.exports = router;
