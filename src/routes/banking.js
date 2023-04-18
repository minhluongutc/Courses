const express = require('express');
const router = express.Router();

const bankingController = require('../app/controllers/BankingController');

router.get('/', bankingController.show);
router.post('/lookup', bankingController.lookup);

module.exports = router;