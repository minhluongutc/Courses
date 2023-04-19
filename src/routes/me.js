const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const meController = require('../app/controllers/MeController');

router.get(
    '/stored/courses',
    jwtMiddleware.verifyToken,
    meController.storedCourses,
);
router.get(
    '/trash/courses',
    jwtMiddleware.verifyToken,
    meController.trashCourses,
);

module.exports = router;
