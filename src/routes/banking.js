const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../app/middlewares/jwtMiddleware');
const bankingController = require('../app/controllers/BankingController');

router.get('/', jwtMiddleware.verifyToken, bankingController.showLookUp);
router.post('/lookup', bankingController.lookup);

router.get(
    '/generate',
    jwtMiddleware.verifyToken,
    bankingController.showGenerateQrCode,
);
router.post('/generate', bankingController.generateQrCode);

router.post('/generateForCourse', bankingController.generateQrCodeForCourse);

module.exports = router;
