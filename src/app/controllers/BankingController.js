const VietQR = require( 'vietqr');
const axios = require('axios')
const readline = require('readline');

class BankingController {

    show(req, res ) {
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
    

}


module.exports = new BankingController