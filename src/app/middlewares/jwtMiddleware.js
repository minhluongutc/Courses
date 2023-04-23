const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

class JwtMiddleware {
    // VerifyToken
    async verifyToken(req, res, next) {
        try {
            const accessToken = req.cookies.refreshToken;
            if (accessToken) {
                const payload = jwt.decode(accessToken);
                const user = await Account.findById( payload.id );
                req.user = user;
                //console.log(user)
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
                const user = await Account.findById( payload.id );
                req.user = user;
                if(user.role == 'vip' || user.role == 'admin') {
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
