const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
var session = require('express-session')
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const Token = require('./app/models/Token');
const route = require('./routes');
const db = require('./config/db');
const MongoClient = require('mongodb').MongoClient;
const jwtMiddleware = require('./app/middlewares/jwtMiddleware');

// Connect to DB
db.connect();

const app = express();
const port = 3000;
const paginate = require('express-paginate');

app.use(paginate.middleware(3));

app.use(function (req, res, next) {
    res.locals.paginate = paginate;
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }//false
}))

app.use(cors());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

//facebook login
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
app.use(passport.session())

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user)
    // })
    done(null, user)
})

app.use(passport.initialize())
const url = 'mongodb://127.0.0.1:27017/f8_education_dev';

passport.use(new FacebookStrategy({
    clientID: '961743685186441',
    clientSecret: '1f4721081a7bee84d728ec493904e939',
    callbackURL: "https://8091-42-114-248-121.ngrok-free.app/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
  function(accessToken, refreshToken, profile, cb) {
    var user = profile
    var newToken = { accessToken: accessToken, user: user }

    // Lưu thông tin đăng nhập vào MongoDB
    MongoClient.connect(url, function(err, db) {
      if (err) return cb(err);
      var dbo = db.db("f8_education_dev")
      dbo.collection("tokens").insertOne(newToken, function(err, res) {
        if (err) return cb(err);
        console.log("Token saved to database")
        db.close()
      })
    })

    return cb(null, profile)
  }
));


app.get('/auth/facebook',
  passport.authenticate('facebook'));

  
  app.get('/auth/facebook/callback', jwtMiddleware.verifyToken, passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    jwt.sign({ id: req.user._id }, 'luong', { expiresIn: '30m' }, (err, refreshToken) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.cookie('accessToken', refreshToken, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000 // Thời gian sống của access token là 30 phút
        });
        //res.redirect('/');
      }
    });
  });

  app.get('/getProfileFb', (req, res, next)=>{
    res.json(req.user)
  })

  
//login facebook

//loggin google

//loggin google

// XMLHttpRequest, fetch, axios, ajax ...

// HTTP logger
//app.use(morgan('combined'))

// Template engine

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,
        },
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>
                `;
            },
            eq: (a, b) => a === b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

// Routes init
// app.get('/', (req, res) => {
//     res.render('home')
// })

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
