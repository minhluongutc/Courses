const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const { mutipleMongooseToObject } = require('../../util/mongoose');

let refreshTokens = [];
let loggedInUser = null;
class AuthController {
    // register
    showRegister(req, res) {
        res.render('register');
    }

    async registerUser(req, res) {
        res.render('register');
        try {
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(req.body.password, salt);

          //Create new user
          const newUser = await new Account({
            username: req.body.username,
            password: hashed,
          });

          //Save to DB
          const user = await newUser.save();
          res.redirect('/auth/login')
        } catch (err) {
          res.status(500).json(err);
        }
    }

    // Generate access token
    generateAccessToken(user) {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            'luong',
            { expiresIn: '30s' },
        );
    }

    // Generate refresh token
    generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            //process.env.JWT_REFRESH_KEY
            'Luong1235',
            { expiresIn: '365d' },
        );
    }

    // Login
    showLogin(req, res) {
        res.render('login');
    }

    async loginUser(req, res) {
        try {
            const user = await Account.findOne({ username: req.body.username });
            
            if (!user) {
                const error = 'Wrong username!';
                return res.redirect(`/auth/login?error=${error}`);
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!validPassword) {
                const error = 'Wrong password!';
                return res.redirect(`/auth/login?error=${error}`);
            }

            const accessToken = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                'luong',
                { expiresIn: '30d' },
            );
            const refreshToken = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                'Luong1235',
                { expiresIn: '365d' },
            );
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            const { password, ...others } = user._doc;

            //res.cookie('loggedInUser', loggedInUser, { maxAge:   900000, httpOnly: true });
            loggedInUser = { username: req.body.username, role: user.role };
            console.log(loggedInUser.role)
            res.render('home', { loggedInUser: loggedInUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Refresh
    async requestRefreshToken(req, res) {
        // Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).json('You are not authenticated');
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, 'Luong1235', (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken,
            );
            // Create new accesstoken, refreshtoken
            const newAccessToken = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                'luong',
                { expiresIn: '30d' },
            );
            const newRefreshToken = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                'Luong1235',
                { expiresIn: '365d' },
            );
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    }

    // logout
    async userLogout(req, res) {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken,
        );
        //res.redirect('/auth/login')
        loggedInUser = null;
        console.log(loggedInUser);
        res.status(200).json('Logged out !');
    }
}

module.exports = new AuthController();
