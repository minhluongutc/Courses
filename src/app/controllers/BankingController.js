const VietQR = require( 'vietqr');
const axios = require('axios')
const Course = require('../models/Course')
const readline = require('readline');
const { render } = require('node-sass');

class BankingController {

    showLookUp(req, res ) {
        res.render('banking/lookup')
    }
    
    async lookup(req, res) {
        try {
          const data = {
            bin: req.body.bin,
            accountNumber: req.body.accountNumber
          };
      
          const config = {
            method: 'post',
            url: 'https://api.vietqr.io/v2/lookup',
            headers: {
              'x-client-id': '2ab01b4f-7b27-48df-8679-e1de5fbbb440',
              'x-api-key': 'cc035823-32a6-4dc5-ae8f-e1e16767e74b',
              'Content-Type': 'application/json',
            },
            data: data,
          };
      
          const response = await axios(config);
      
          // xử lý kết quả trả về
          const result = {
            accountName: response.data
          };
          res.status(200).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
    }

    showGenerateQrCode (req, res) {
      res.render('banking/generateQrCode')
    }
    
    async generateQrCode (req, res) {
      try {
        const { accountNo, accountName, acqId, addInfo, amount, template } = req.body;
    
        const config = {
          headers: {
            'x-client-id': '<2ab01b4f-7b27-48df-8679-e1de5fbbb440>',
            'x-api-key': '<cc035823-32a6-4dc5-ae8f-e1e16767e74b>',
            'Content-Type': 'application/json',
          },
        };
    
        const data = { accountNo, accountName, acqId, addInfo, amount, template, };
    
        const response = await axios.post('https://api.vietqr.io/v2/generate', data, config);
    
        res.render('banking/QrCode', { data: response.data })
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    async generateQrCodeForCourse (req, res) {
      try {
        const { accountNo, accountName, acqId, addInfo, amount, template } = req.body;
    
        const config = {
          headers: {
            'x-client-id': '<2ab01b4f-7b27-48df-8679-e1de5fbbb440>',
            'x-api-key': '<cc035823-32a6-4dc5-ae8f-e1e16767e74b>',
            'Content-Type': 'application/json',
          },
        };
    
        const data = 
        { accountNo: '0345571823', 
          accountName: 'Nguyen Minh Luong', 
          acqId: '970422', 
          addInfo: 'Thanh toán khóa học', 
          amount, 
          template: 'compact2', 
        };
    
        const response = await axios.post('https://api.vietqr.io/v2/generate', data, config);
        res.render('banking/QrCode', { data: response.data })
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
}


module.exports = new BankingController