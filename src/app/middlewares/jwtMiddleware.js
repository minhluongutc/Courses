const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const Token = require('../models/Token');

class JwtMiddleware {
    // VerifyToken
    // Middleware xác thực token Facebook
    async verifyFacebookToken(req, res, next) {
        try {
          const accessToken = req.cookies.refreshToken;
          const userToken = await Token.findOne({ accessToken: accessToken });
          //console.log(accessToken, userToken)
          console.log(req.cookies)
          if (!accessToken) {
            return res.status(401).json("Access token not found");
          }
          if (!userToken) {
            return res.status(401).json("Invalid access token");
          }
          req.user = userToken.user;
          next();
        } catch (error) {
          return res.status(500).json("Internal server error");
        }
      }
      
  
  // Middleware xác thực token của bạn
  async verifyToken(req, res, next) {
    try {
      const accessToken = req.cookies.refreshToken;
      if (accessToken) {
        const payload = jwt.decode(accessToken);
        const user = await Account.findById(payload.id);
        req.user = user;
        next();
      } else {
        res.status(401).json('You are not authenticated');
      }
    } catch (error) {
      res.status(403).json('Token is not valid');
    }
  }
      

    // check admin
    async verifyTokenAndAdminAuth(req, res, next) {
        try {
            const accessToken = req.cookies.refreshToken;
            if (accessToken) {
                const payload = jwt.decode(accessToken);
                const user = await Account.findById(payload.id);
                req.user = user;
                if (user.role == 'admin') {
                    next();
                } else {
                    res.status(401).json('You are not authenticated');
                }
                //console.log(user)
            } else {
                res.status(401).json('You are not authenticated');
            }
        } catch (error) {
            res.status(403).json('Token is not valid');
        }
    }
}

module.exports = new JwtMiddleware();
