const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

class JwtMiddleware {
    // VerifyToken
    async verifyToken(req, res, next) {
        try {
            const accessToken = req.cookies.refreshToken;
            if (accessToken) {
                const payload = jwt.decode(accessToken);
                const user = await Account.findOne({ id: payload.id });
                // const loggedInUser = { username: req.body.username, role: user.role };
                req.user = user;
                next();
            } else {
                res.status(401).json('You are not authenticated');
            }
        } catch (error) {
            res.status(403).json('Token is not valid');
        }
    }

    // Delete user
    async verifyTokenAndAdminAuth(req, res, next) {
        jwtMiddleware.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.role == 'admin') {
                next();
            } else {
                res.status(403).json('You a not allowed to delete other');
            }
        });
    }
}

module.exports = new JwtMiddleware();
