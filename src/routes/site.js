const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const authController = require('../app/controllers/AuthController');

router.get('/search', siteController.search);
router.get('/', siteController.index);
router.post('/', authController.loginUser);

module.exports = router;
