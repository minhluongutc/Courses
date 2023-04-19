const express = require('express');
const router = express.Router();

const bankingController = require('../app/controllers/BankingController');

router.get('/', bankingController.showLookUp);
router.post('/lookup', bankingController.lookup);

router.get('/generate', bankingController.showGenerateQrCode);
router.post('/generate', bankingController.generateQrCode);


router.post('/generateForCourse', bankingController.generateQrCodeForCourse);



module.exports = router;