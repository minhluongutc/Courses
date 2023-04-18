const newsRouter = require('./news');
const homeRouter = require('./home');
const authRouter = require('./auth');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const learningRouter = require('./learning');
const userRouter = require('./user');

const checkUser = require('../app/middlewares/CheckUser');
const checkLogin = require('../app/middlewares/CheckLogin');

function route(app) {
    app.use('/learning', learningRouter);
    app.use('/news', newsRouter);
    app.use('/home', homeRouter);
    app.use('/auth', authRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
